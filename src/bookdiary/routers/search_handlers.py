import requests

from datetime import datetime

from src.bookdiary.schemas.exceptions import NotFoundException, ServerException

from fastapi import APIRouter

from src.config.project_config import settings

router = APIRouter(prefix="/search", tags=["Search"])


def get_current_user(user_id: int):
    return user_id


def search_books(query: str):
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&intitle={query}&key={settings.GOOGLE_API_KEY}"
    # url = f"http://openlibrary.org/search.json?q={query}"

    response = requests.get(url)
    data = response.json()
    if "totalItems" not in data.keys():
        raise ServerException(detail="Google API fail")
    if not data["totalItems"]:
        raise NotFoundException(detail="Nothing found for your query.")
    return data


async def prepare_article_data(data: dict):
    books_data = search_books(data.book_name)["items"][0]
    returned_data = data.dict()

    returned_data["book_name"] = books_data["volumeInfo"]["title"]
    returned_data["book_authors"] = (
        books_data["volumeInfo"]["authors"]
        if len(books_data["volumeInfo"]["authors"]) > 0
        else ["No authors"]
    )
    returned_data["book_id"] = books_data["id"]
    returned_data["publication_date"] = datetime.now()
    # returned_data["publication_date"] = datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    returned_data["book_genre"] = "-"

    return returned_data


@router.get("/")  # response_model=List[Search_Response]
async def search_books_by_query(query: str):
    result = search_books(query)
    return [row["volumeInfo"]["title"] for row in result["items"]]
