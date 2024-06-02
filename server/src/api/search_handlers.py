# pylint: disable=no-member
from fastapi import APIRouter
from imdb import Cinemagoer, IMDbError
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from src.config.project_config import settings

search_router = APIRouter(
    prefix="/search"
)
ia = Cinemagoer()
service = build('books', 'v1', developerKey=settings.GOOGLE_API_KEY)


@search_router.get("/movie", tags=["Search"])
def search_movie_imdb(query: str):
    """
    Эта функция ищет фильмы в базе данных IMDb, используя предоставленный запрос.

    Parameters:
    query (str): Строка поискового запроса.

    Returns:
    dict: Словарь, содержащий статус операции и результаты поиска.
          Если операция прошла успешно, словарь будет иметь следующую структуру:
          {
              "status": "ok",
              "result": [
                  {
                      "data": movie_data,
                      "movieID": movie_id
                  },
                 ...
              ]
          }
          Если в ходе операции произойдет ошибка, словарь будет иметь следующую структуру:
          {
              "status": "error",
              "message": error_message
          }
    """
    try:
        movies = ia.search_movie(query)
        for i in range(len(movies)):
            movies[i]['movieID'] = movies[i].movieID
        return {"status": "ok", "result": movies}
    except IMDbError as e:
        return {"status": "error", "message": str(e)}


@search_router.get("/person", tags=["Search"])
def search_person(query: str):
    """
    Эта функция ищет людей в базе данных IMDb, используя предоставленный запрос.

    Parameters:
    query (str): Строка поискового запроса.

    Returns:
    dict: Словарь, содержащий статус операции и результаты поиска.
          Если операция прошла успешно, словарь будет иметь следующую структуру:
          {
              "status": "ok",
              "result": [
                  {
                      "data": person_data,
                      "personID": person_id
                  },
                ...
              ]
          }
          Если в ходе операции произойдет ошибка, словарь будет иметь следующую структуру:
          {
              "status": "error",
              "message": error_message
          }
    """
    try:
        peoples = ia.search_person(query)
        for i in range(len(peoples)):
            peoples[i]['personID'] = peoples[i].personID
        return {"status": "ok", "result": peoples}
    except IMDbError as e:
        return {"status": "error", "message": str(e)}


@search_router.get("/book", tags=["Search"])
def search_book(query: str):
    """
    Эта функция ищет книги в API Google Books, используя предоставленный запрос.

    Parameters:
    query (str): Строка поискового запроса.

    Returns:
    dict: Словарь, содержащий статус операции и результаты поиска.
          Если операция прошла успешно, словарь будет иметь следующую структуру:
          {
              "items": [
                  {
                      "volumeInfo": book_info,
                      "id": book_id
                  },
                 ...
              ],
              "kind": "books#volumes",
              "totalItems": total_items
          }
          Если во время операции произойдет ошибка, будет выдано исключение следующего формата:
          'Error response status code : {status_code}, reason : {error_details}'

    Raises:
    HttpError: Если во время HTTP-запроса к API Google Books возникает ошибка.
    """
    try:
        request = service.volumes().list(q=query, maxResults=15, printType="BOOKS", projection="LITE")
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
