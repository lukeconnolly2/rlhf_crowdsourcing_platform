from fastapi import FastAPI, Body, Request, HTTPException, status, Security
from fastapi.security import APIKeyHeader
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from fastapi.encoders import jsonable_encoder
from models import VideoData
import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import (
    BlobServiceClient,
    BlobClient,
    ContainerClient,
    generate_blob_sas,
    BlobSasPermissions,
)
from dotenv import load_dotenv
from constants import SALT, ROLES
import hashlib
import re
from datetime import datetime, timedelta

PUBLIC_DATALAKE_URL = "https://fypstorageucd.blob.core.windows.net/videos/"
CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
client_uri = "mongodb://admin:admin@db:27017/"
PRIVATE_API_KEY = os.getenv("PRIVATE_API_KEY")

if not CONNECTION_STRING:
    print("Running in local mode. Getting connection strings from .env.local")
    load_dotenv(".env.local")
    CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
    client_uri = os.getenv("MONGO_CONNECTION_STRING")
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
    app.mongodb_client = MongoClient(client_uri)
    app.database = app.mongodb_client["FYP"]
    try:
        app.mongodb_client.admin.command("ismaster")
        print("Connected to the MongoDB database!")
    except PyMongoError:
        print("Connection to MongoDB failed! ")


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
    return {"id": str(result.inserted_id)}


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


@app.get("/getUserData")
def get_user_data(user: str, api_key: str = Security(check_private_api_key)):
    if app.database.users.find_one({"user": user}):
        user_data = app.database.users.find_one(
            {"user": user}, {"_id": 0, "key": 1, "role": 1, "default_required_views": 1}
        )
        user_videos = list(app.database.videos.find({"user": user_data["key"]}))
        user_data["videos"] = user_videos
        return user_data
    else:
        api_key = generate_api_key(user)
        role = ROLES["USER"]
        default_required_views = 2
        app.database.users.insert_one(
            {
                "user": user,
                "key": api_key,
                "role": role,
                "default_required_views": default_required_views,
            }
        )
        user = app.database.users.find_one(
            {"user": user}, {"_id": 0, "key": 1, "role": 1, "default_required_views": 1}
        )
        user["videos"] = []
        return user


@app.post("/preference")
def update_preferences(
    api_key: str = Security(check_private_api_key),
    video_id: str = Body(...),
    preference: list[int] = Body(...),
):
    print(f"Adding preference f{preference} to video {video_id}")
    possible_preferences = [-1, 0, 1]
    if len(preference) != 2:
        return {"status": "failed", "reason": "Invalid preference"}

    if (preference[0] not in possible_preferences) or (
        preference[1] not in possible_preferences
    ):
        return {"status": "failed", "reason": "Invalid preference"}

    if not app.database.videos.find_one({"_id": video_id}):
        return {"status": "failed", "reason": "Video not found"}

    print(f"preference: {preference}", f"video_id: {video_id}")

    return {"status": "success"}


@app.post("/release")
def release_video(
    api_key: str = Security(check_private_api_key), req: object = Body(...)
):
    print(f"Releasing videos: {req}")

    video_id = req["video_id"]
    print(f"Updating status of videos: {video_id}")

    if not app.database.videos.find_one({"_id": video_id}):
        print(f"Video {video_id} not found")
        return {"status": "failed", "reason": f"Video {video_id} not found"}
    else:
        app.database.videos.update_one(
            {"_id": video_id}, {"$set": {"status": "Released"}}
        )
    print(f"Video {video_id} released")
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
