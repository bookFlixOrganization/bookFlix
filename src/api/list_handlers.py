# pylint: disable=missing-timeout
import json
import requests
from fastapi import APIRouter
from tmdbv3api import TMDb, Movie, Discover, exceptions
from googleapiclient.errors import HttpError

from src.config.project_config import settings

list_router = APIRouter(
    prefix="/list"
)
tmdb = TMDb()
tmdb.api_key = settings.TMDB_TOKEN
movie = Movie()
discover = Discover()

tags_metadata = [
    {
        "name": "sort_by",
        "description": "Returns a list of movies that best match a given criterion."
    },
]


@list_router.get("/top_rated_movies", tags=["api_film"])
def get_top_rated():
    """
    Извлекает фильмы с самым высоким рейтингом из базы данных фильмов (TMDb).

    Parameters:
    None

    Returns:
    dict: Словарь, содержащий статус запроса и результат.
          Если запрос успешен, словарь будет иметь следующую структуру:
          {
              "status": "ok",
              "result": {
                  "movie_id": {
                      "title": "Movie Title",
                      "overview": "Movie Overview",
                      "poster_path": "https://image.tmdb.org/t/p/w220_and_h330_face/movie_poster_path"
                  },
                 ...
              }
          }
          Если запрос не выполнен, словарь будет иметь следующую структуру:
          {
              "status": "error",
              "message": "Error message"
          }
    """
    movie_list = movie.top_rated()
    try:
        top_rated = {}

        for p in movie_list:
            top_rated[f"{p.id}"] = {"title": p.title, "overview": p.overview,
                                    "poster_path": f"https://image.tmdb.org/t/p/w220_and_h330_face{p.poster_path}"
                                    }
        return {"status": "ok", "result": top_rated}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": str(e)}


@list_router.get("/sorted_films",
                 tags=["sort_by"],
                 description="Available values: id, title, popularity, release_date, vote_average, vote_count")
def sort_by(sort_criterion: str):
    """
    Извлекает список фильмов, отсортированных по указанному критерию, из базы данных TMDb.

    Parameters:
    sort_criterion (str): Критерий сортировки фильмов. Это может быть одно из следующих:
                          'id', 'title', 'popularity', 'release_date', 'vote_average', 'vote_count'.

    Returns:
    dict: Словарь, содержащий статус запроса и результат.
          Если запрос успешен, словарь будет иметь следующую структуру:
          {
              "status": "ok",
              "result": {
                  "movie_id": {
                      "title": "Movie Title",
                      "overview": "Movie Overview",
                      "poster_path": "https://image.tmdb.org/t/p/w220_and_h330_face/movie_poster_path"
                  },
                ...
              }
          }
          Если запрос не удался, словарь будет иметь следующую структуру:
          {
              "status": "error",
              "message": "Error message"
          }
    """
    sorted_list = discover.discover_movies({
        'ort_by': f"{sort_criterion}.desc"
    })
    movie_list = {}
    try:
        for q in sorted_list:
            movie_list[f"{q.id}"] = {"title": q.title, "overview": q.overview,
                                     "poster_path": f"https://image.tmdb.org/t/p/w220_and_h330_face{q.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": str(e)}


@list_router.get("/most_popular_books", tags=["api_book"])
def get_nyt_bestsellers():
    """
    Собирает самые популярные книги из списка бестселлеров New York Times.

    Parameters:
    None

    Returns:
    dict: Словарь, содержащий статус запроса и результат.
          Если запрос успешен, словарь будет иметь следующую структуру:
          {
              "status": "ok",
              "result": [
                  {
                      "title": "Book Title",
                      "author": "Author Name",
                      "description": "Book Description",
                      "publisher": "Publisher Name",
                      "isbns": [
                          {
                              "isbn10": "isbn10_number",
                              "isbn13": "isbn13_number"
                          },
                         ...
                      ]
                  },
                 ...
              ]
          }
          Если запрос не выполнен, словарь будет иметь следующую структуру:
          {
              "status": "error",
              "message": "Error message"
          }
    """
    try:
        url = f"https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key={settings.TNY_API_KEY}"

        response = requests.get(url)
        data = json.loads(response.text)
        return {"status": "ok", "result": (data["results"])["lists"][0]["books"]}
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
