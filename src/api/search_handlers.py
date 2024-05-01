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


@search_router.get("/movie", tags=["api_film"])
async def search_movie_imdb(query: str):
    try:
        movies = ia.search_movie(query)
        for i in range(len(movies)):
            movies[i]['movieID'] = movies[i].movieID
        return {"status": "ok", "result": movies}
    except IMDbError as e:
        return {"status": "error", "message": e}


@search_router.get("/person", tags=["api_film"])
async def search_person(query: str):
    try:
        peoples = ia.search_person(query)
        for i in range(len(peoples)):
            peoples[i]['personID'] = peoples[i].personID
        return {"status": "ok", "result": peoples}
    except IMDbError as e:
        return {"status": "error", "message": e}


@search_router.get("/keyword", tags=["api_film"])
async def search_keyword(query: str):
    try:
        func_result = ia.search_keyword(query)
        keywords = []
        for p in func_result:
            if len(p.split(' ')) == 1:
                keywords.append(p)
            else:
                pass
        return {"status": "ok", "result": keywords}
    except IMDbError as e:
        return {"status": "error", "message": e}


@search_router.get("/get_keyword", tags=["api_film"])
async def get_keyword(query: str):
    try:
        keyword = ia.get_keyword(query)
        return {"status": "ok", "result": keyword}
    except IMDbError as e:
        return {"status": "error", "message": e}


@search_router.get("/book", tags=["api_book"])
async def search_book(query: str):
    try:
        service = build('books', 'v1', developerKey=settings.GOOGLE_API_KEY)
        request = service.volumes().list(q=query, maxResults=15, printType="BOOKS", projection="LITE")
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
