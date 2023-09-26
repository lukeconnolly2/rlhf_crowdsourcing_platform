from fastapi import FastAPI, Body, Request
from typing import Optional
from pymongo import MongoClient
from pydantic import BaseModel, Field
from fastapi.encoders import jsonable_encoder
import uuid

class VideoData(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    video1id: str
    video2id: str
    videoRef: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "video1id": "055cf619",
                "video2id": "266aef608",
                "videoRef": "/some/blob/storage/path"
            }
        }

class UpdateVideoData(BaseModel):
    video1id: Optional[str]
    video2id: Optional[str]
    videoRef: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "video1id": "055cf619",
                "video2id": "266aef608",
                "videoRef": "/some/blob/storage/path"
            }
        }


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