"""
Модуль для связи с google books api
"""

from datetime import datetime

import requests

from fastapi import APIRouter

from src.bookdiary.schemas.exceptions import NotFoundException, ServerException
from src.config.project_config import settings

router = APIRouter(prefix="/search", tags=["Search"])


def search_books(query: str):
    """
    Поиск книг по запросу
    """
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}& \
                                                        intitle={query}& \
                                                        key={settings.GOOGLE_API_KEY}"
    # url = f"http://openlibrary.org/search.json?q={query}"

    response = requests.get(url, timeout=(10, 20))
    data = response.json()
    if "totalItems" not in data.keys():
        raise ServerException(detail="Google API fail")
    if not data["totalItems"]:
        raise NotFoundException(detail="Nothing found for your query.")
    return data


async def prepare_article_data(data: dict):
    """
    Подготовка данных для эндпоинтов
    """
    books_data: dict
    if "book_id" not in data.__dict__.keys():
        books_data = search_books(data.book_name)["items"][0]
    else:
        books_data = search_books(data.book_id)["items"][0]
    returned_data = data.dict()

    returned_data["book_name"] = books_data["volumeInfo"]["title"]
    returned_data["book_authors"] = (
        books_data["volumeInfo"]["authors"]
        if len(books_data["volumeInfo"]["authors"]) > 0
        else ["No authors"]
    )
    returned_data["book_id"] = books_data["id"]
    if "categories" in books_data["volumeInfo"].keys():
        returned_data["book_genre"] = ",".join(books_data["volumeInfo"]["categories"])
    else:
        returned_data["book_genre"] = "-"
    # returned_data["publication_date"] = datetime.now()
    returned_data["publication_date"] = (datetime.now()).strftime("%d.%m.%Y в %H:%M")

    return returned_data


@router.get("/")  # response_model=List[Search_Response]
async def search_books_by_query(query: str):
    """
    Тестовый эндпоинт, чтобы понять какие данные возвращаются
    """
    result = search_books(query)
    return result
