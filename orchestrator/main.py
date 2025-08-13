from fastapi import FastAPI, Body, Request, HTTPException, status, Security
from fastapi.security import APIKeyHeader
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from fastapi.encoders import jsonable_encoder
from models import VideoData, Preference
import os
from azure.identity import DefaultAzureCredential
from azure.storage.blob import (
    BlobServiceClient,
    generate_blob_sas,
    BlobSasPermissions,
)
from dotenv import load_dotenv
from constants import SALT
import hashlib
import re
from datetime import datetime, timedelta
import logging

PUBLIC_DATALAKE_URL = os.getenv("PUBLIC_DATALAKE_URL")
CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_PORT = os.getenv("DATABASE_PORT")
CLIENT_URI = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{DATABASE_URL}:{DATABASE_PORT}/"
PRIVATE_API_KEY = os.getenv("PRIVATE_API_KEY")

if not CONNECTION_STRING:
    print("Running in local mode. Getting connection strings from .env.local")
    load_dotenv(".env.local")
    CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
    CLIENT_URI = os.getenv("MONGO_CONNECTION_STRING")
    PRIVATE_API_KEY = os.getenv("PRIVATE_API_KEY")

ACCOUNT_NAME = re.search("AccountName=(.+?);", CONNECTION_STRING).group(1)
ACCOUNT_KEY = re.search("AccountKey=(.+?);", CONNECTION_STRING).group(1)

blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
container_client = blob_service_client.get_container_client("videos")

api_key_header = APIKeyHeader(name="x-api-key", auto_error=False)


def check_private_api_key(
    api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_header == PRIVATE_API_KEY:
        print("Private API Key accepted")
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )


def generate_api_key(user):
    return hashlib.sha256((user + SALT).encode()).hexdigest()


app = FastAPI()


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(CLIENT_URI)
    app.database = app.mongodb_client["FYP"]
    try:
        app.mongodb_client.admin.command("ismaster")
        print("Connected to the MongoDB database!")
        logging.info("Connected to the MongoDB database!")
    except PyMongoError:
        logging.error("Connection to MongoDB failed! ")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


def check_public_api_key(
    api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_header in list(app.database.users.distinct("key")):
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )


@app.get("/video")
def get_videos(user: str):
    api_key = app.database.users.find_one({"user": user}, {"_id": 0, "key": 1})["key"]
    videos = list(app.database.videos.find({"user": api_key}))
    logging.info(f"User {user} requested videos")
    return videos


@app.post("/video")
def add_video(
    request: Request,
    video: VideoData = Body(...),
    api_key: str = Security(check_public_api_key),
):
    video = jsonable_encoder(video)
    video["user"] = api_key
    video["required_views"] = app.database.users.find_one(
        {"key": api_key}, {"_id": 0, "default_required_views": 1}
    )["default_required_views"]
    result = app.database["videos"].insert_one(video)
    logging.info(f"User {api_key} added video {video['title']}")
    return {"id": str(result.inserted_id)}


@app.get("/releasedVideos")
def get_released_videos(user: str):
    # find all videos with status released and no preference from user
    videos = list(
        app.database.videos.find(
            {
                "status": "Released",
                "preferences": {"$not": {"$elemMatch": {"user": user}}},
            }
        )
    )
    return videos


@app.get("/getUploadURL")
def get_upload_url(filename, api_key: str = Security(check_public_api_key)):
    sas_token = generate_blob_sas(
        account_name=ACCOUNT_NAME,
        container_name="videos",
        blob_name=filename,
        account_key=ACCOUNT_KEY,
        permission=BlobSasPermissions(write=True),
        expiry=datetime.utcnow() + timedelta(hours=1),  # Token valid for 1 hour
    )
    return {"url": PUBLIC_DATALAKE_URL + filename + "?" + sas_token}


@app.get("/addUser")
def get_user_data(user: str, api_key: str = Security(check_private_api_key)):
    if app.database.users.find_one({"user": user}):
        return
    else:
        api_key = generate_api_key(user)
        default_required_views = 2
        notifications = 0
        app.database.users.insert_one(
            {
                "user": user,
                "key": api_key,
                "default_required_views": default_required_views,
                "notifications": notifications,
            }
        )
        return


@app.post("/preference")
def update_preferences(
    api_key: str = Security(check_private_api_key),
    preference_request: Preference = Body(...),
):
    user = preference_request.user
    video_id = preference_request.video_id
    preference = preference_request.preference

    match preference:
        case "Left":
            preference = [1, 0]
        case "Right":
            preference = [0, 1]
        case "None":
            preference = [0, 0]
        case _:
            logging.error(f"Invalid preference: {preference}")
            return {"status": "failed", "reason": "Invalid preference"}

    if not app.database.videos.find_one({"_id": video_id}):
        logging.error(f"Video {video_id} not found")
        return {"status": "failed", "reason": "Video not found"}

    print(f"preference: {preference}", f"video_id: {video_id}")

    app.database.videos.update_one(
        {"_id": video_id},
        {
            "$inc": {"views": 1},
            "$push": {"preferences": {"preference": preference, "user": user}},
        },
    )
    logging.info(f"User {user} updated preference for video {video_id}")

    video = app.database.videos.find_one({"_id": video_id})

    if video["views"] >= video["required_views"]:
        app.database.videos.update_one({"_id": video_id}, {"$set": {"status": "Done"}})
        logging.info(f"Video {video_id} reached required views")
    return {"status": "success"}


@app.post("/release")
def release_video(
    api_key: str = Security(check_private_api_key), req: object = Body(...)
):
    video_id = req["video_id"]
    if not app.database.videos.find_one({"_id": video_id}):
        logging.error(f"Video {video_id} not found, release failed")
        return {"status": "failed", "reason": f"Video {video_id} not found"}
    else:
        logging.info(f"Releasing video {video_id}")
        app.database.videos.update_one(
            {"_id": video_id}, {"$set": {"status": "Released"}}
        )
    return {"status": "success"}


@app.post("/release/list")
def release_videos(
    api_key: str = Security(check_private_api_key), req: object = Body(...)
):
    print(f"Releasing videos: {req}")
    video_ids = req["video_ids"]
    for video_id in video_ids:
        if not app.database.videos.find_one({"_id": video_id}):
            print(f"Video {video_id} not found")
            return {"status": "failed", "reason": f"Video {video_id} not found"}
        else:
            app.database.videos.update_one(
                {"_id": video_id}, {"$set": {"status": "Released"}}
            )
        print(f"Video {video_id} released")
    return {"status": "success"}


@app.get("/getRequiredViews")
def get_required_views(
    user: str,
    api_key: str = Security(check_private_api_key),
):
    if not app.database.users.find_one({"user": user}):
        print(f"User {user} not found")
        return {"status": "failed", "reason": f"User {user} not found"}

    required_views = app.database.users.find_one(
        {"user": user}, {"_id": 0, "default_required_views": 1}
    )["default_required_views"]

    return {"status": "success", "requiredViews": required_views}


@app.post("/updateRequiredViews")
def update_required_views(
    api_key: str = Security(check_private_api_key),
    req: object = Body(...),
):
    print(f"Updating required views: {req}")

    if not app.database.users.find_one({"user": req["user"]}):
        print(f"User {req['user']} not found")
        return {"status": "failed", "reason": f"User {req['user']} not found"}

    app.database.users.update_one(
        {"user": req["user"]},
        {"$set": {"default_required_views": int(req["requiredViews"])}},
    )

    return {"status": "success"}


@app.get("/get_api_key")
def get_api_key(user: str, api_key: str = Security(check_private_api_key)):
    return {
        "api_key": app.database.users.find_one({"user": user}, {"_id": 0, "key": 1})[
            "key"
        ]
    }


@app.get("/notifications")
def get_notifications(user: str, api_key: str = Security(check_private_api_key)):
    try:
        return app.database.users.find_one({"user": user})["notifications"]
    except KeyError:
        app.database.users.update_one({"user": user}, {"$set": {"notifications": 0}})
        return {"notifications": 0}


@app.post("/notifications")
def update_notifications(
    user: str,
    api_key: str = Security(check_private_api_key),
    req: object = Body(...),
):
    app.database.users.update_one(
        {"user": user}, {"$inc": {"notifications": req["number_sent"]}}
    )
    return {"status": "success"}


@app.get("/results")
def get_results(api_key: str = Security(check_public_api_key)):
    results = list(app.database.videos.find({"user": api_key, "status": "Done"}))
    return results
