from fastapi import FastAPI, Body, Request
from pymongo import MongoClient
from fastapi.encoders import jsonable_encoder
from minio import Minio
from models import VideoData

datalake = Minio(
    "datalake:9000",
    access_key="test1",
    secret_key="MsJWKd0vvzYi3IvNnwoV9T8D4y4W4y091XZb9pXt",
    secure=False,
)

app = FastAPI()

# Connect to MongoDB
client_uri = "mongodb://admin:admin@db:27017/"

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(client_uri)
    app.database = app.mongodb_client['videos']
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

@app.get("/")
def read_root():
    #delete all videos
    app.database.videos.delete_many({})
    return {"Hello": "World"}

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
        name = vid['videoName']
        url = datalake.get_presigned_url(
            "GET",
            'videos',
            name,
        )
        print(url)
        links.append(url)
    return links
    