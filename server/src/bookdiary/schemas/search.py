# pylint: disable=C0103


"""
Схемы для поиска
"""

from typing import List

from pydantic import BaseModel


class Volume_Info_Schema(BaseModel):
    """
    Схемы для обработки
    """

    title: str
    authors: List[str] = ["Authors not found"]
    publishedDate: str = "Date of publish not found"


class Search_Response(BaseModel):
    """
    Схема ответа на запрос
    """

    id: str
    volumeInfo: Volume_Info_Schema
