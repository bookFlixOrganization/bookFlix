from pydantic import BaseModel
from typing import List


class Volume_Info_Schema(BaseModel):
    title: str
    authors: List[str] = ["Authors not found"]
    publishedDate: str = "Date of publish not found"


class Search_Response(BaseModel):
    id: str
    volumeInfo: Volume_Info_Schema
