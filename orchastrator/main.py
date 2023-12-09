from fastapi import FastAPI, Body, Request, HTTPException, status, Security
from fastapi.security import APIKeyHeader, APIKeyQuery
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from fastapi.encoders import jsonable_encoder
from models import VideoData
import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from dotenv import load_dotenv
from constants import SALT 
import hashlib

CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
client_uri = "mongodb://admin:admin@db:27017/"
PRIVATE_API_KEY = os.getenv("PRIVATE_API_KEY")

if not CONNECTION_STRING:
    print("Running in local mode. Getting connection string from .env.local")
    load_dotenv(".env.local")
    CONNECTION_STRING = os.getenv("DATALAKE_CONNECTION_STRING")
    client_uri = os.getenv("MONGO_CONNECTION_STRING")
    PRIVATE_API_KEY = os.getenv("PRIVATE_API_KEY")

blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
container_client = blob_service_client.get_container_client("videos")


api_key_header = APIKeyHeader(name="x-api-key", auto_error=False)

def check_private_api_key(
        api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_header == PRIVATE_API_KEY:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )


app = FastAPI()

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(client_uri)
    app.database = app.mongodb_client['FYP']
    try:
        app.mongodb_client.admin.command('ismaster')
        print("Connected to the MongoDB database!")
    except PyMongoError:
        print("Connection to MongoDB failed! ")



@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

def check_public_api_key(
        api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_header in list(app.database.users.distinct('key')):
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )

@app.get("/video")
def get_videos():
    videos = list(app.database.videos.find())
    return videos

@app.post("/video")
def add_video(request: Request, video: VideoData = Body(...) ):
    video = jsonable_encoder(video)
    result = app.database["videos"].insert_one(video)
    return {"id": str(result.inserted_id)}

@app.get("/videolinks")
def get_video_links():
    links = []
    videos = list(app.database.videos.find())
    for vid in videos:
        if vid['viewed'] == True:
            continue
        
        name = vid['videoName']
        url = container_client.get_blob_client(name).url
        links.append(url)
    return links
    
@app.get("/getAPIKey")
def get_api_key(user: str, api_key: str = Security(check_private_api_key)):
    #check if user exists
    if app.database.users.find_one({"user": user}):
        print("User already exists")
        return {"key": app.database.users.find_one({"user": user})['key']}
    else:
        print("Creating new user")
        api_key = hashlib.sha256((user + SALT).encode()).hexdigest()
        app.database.users.insert_one({"user": user, "key": api_key})
    return {"key": api_key}
