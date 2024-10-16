from typing import Optional
from click import Option
from pydantic import BaseModel, Field
from bson import ObjectId
import uuid


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class VideoData(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    public_url: str
    user: Optional[str] = None
    views: int = 0
    preferences: list = []
    status: str = "Unreleased"
    required_views: int = 2
    title: str = "Untitled"
    description: str = "No description"
    additional_data: Optional[list] = []

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "public_url": "https://s3.com/video1.mp4",
            }
        }


class Preference(BaseModel):
    user: str
    video_id: str
    preference: str
