from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

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
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
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