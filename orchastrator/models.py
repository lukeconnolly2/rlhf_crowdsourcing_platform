from typing import Optional
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
    video1id: str
    video2id: str
    videoName: str
    viewed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "video1id": "055cf619",
                "video2id": "266aef608",
                "videoName": "video1.mp4"
            }
        }

class UpdateVideoData(BaseModel):
    video1id: Optional[str]
    video2id: Optional[str]
    videoName: Optional[str]
    viewed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "video1id": "055cf619",
                "video2id": "266aef608",
                "videoName": "/some/blob/storage/path111"
            }
        }