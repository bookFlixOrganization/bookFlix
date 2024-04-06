import uuid

from fastapi import APIRouter, Depends
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import requests
from fastapi import HTTPException
from src.config.db.auth_session import User
from fastapi_users import fastapi_users, FastAPIUsers

from src.config.project_config import GOOGLE_API_KEY

from src.config.project_config import TMDB_TOKEN
from src.models.dals import get_user_manager
from src.api.auth import auth_backend
from imdb import Cinemagoer, IMDbError
from src.schemas.auth_schemas import UserRead, UserCreate

from tmdbv3api import TMDb, Movie, Search, Discover

tmdb = TMDb()
tmdb.api_key = TMDB_TOKEN
movie = Movie()
search = Search()
discover = Discover()

user_router = APIRouter()

tags_metadata = [
    {
        "name": "sort_by",
        "description": "Returns a list of movies that best match a given criterion."
    },
]

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

user_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

user_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

current_user = fastapi_users.current_user()
ia = Cinemagoer()



@user_router.get("/tmdb/similar")
async def get_similar(movie_id: int):
    similar = movie.similar(movie_id)
    movie_list = {}
    try:
        for p in similar:
            movie_list[f"{p.title}"] = {"overview": p.overview}
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie_list}


@user_router.get("/search/tmdb/movie")
async def search_movie_tmdb(query: str):
    try:
        tmdb_films = search.movies(query)
        movie_list = {}

        for p in tmdb_films:
            movie_list[f"{p.id}"] = {"title:": p.title, "overview": p.overview,
                                     "vote_average": p.vote_average}
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie_list}


@user_router.get("/get/tmdb/movie")
async def get_movie_tmdb(movie_id: int):
    try:
        movie_tmdb = movie.details(movie_id)
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie_tmdb}


@user_router.get("/get/top")
async def get_top():
    try:
        movie_list = {}
        popular = movie.popular()
        for p in popular:
            movie_list[f"{p.id}"] = {"title:": p.title, "overview": p.overview, "poster_path:": p.poster_path}
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie_list}


@user_router.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.username}"


@user_router.get("/unprotected-route")
def unprotected_route():
    return f"Hello, anonym"


@user_router.get("/search/movie")
async def search_movie(query: str):
    try:
        movies = ia.search_movie(query)
        for i in range(len(movies)):
            movies[i]['movieID'] = movies[i].movieID
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movies}


@user_router.get("/search/person")
async def search_person(query: str):
    try:
        peoples = ia.search_person(query)
        for i in range(len(peoples)):
            peoples[i]['personID'] = peoples[i].personID
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": peoples}


@user_router.get("/get/movie")
async def get_movie(movie_id: str):
    try:
        movie = ia.get_movie(movie_id)
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie}


@user_router.get("/get/person")
async def get_person(person_id: str):
    try:
        person = ia.get_person(person_id)
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": person}


@user_router.get("/search/keyword")
async def search_keyword(query: str):
    try:
        func_result = ia.search_keyword(query)
        keywords = []
        for p in func_result:
            keywords.append(p) if len(p.split(' ')) == 1 else None
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": keywords}


@user_router.get("/get/keyword")
async def get_keyword(query: str):
    try:
        keyword = ia.get_keyword(query)
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": keyword}


@user_router.get("/tmdb/top_rated")
async def get_top_rated():
    movie_list = movie.top_rated()
    try:
        top_rated = {}
        for p in movie_list:
            top_rated[f"{p.id}"] = {"title:": p.title, "overview": p.overview, "poster_path:": p.poster_path}
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": top_rated}


@user_router.get("/tmdb/sorted",
                 tags=["sort_by"],
                 description="Available values: id, title, popularity, release_date, vote_average, vote_count")
async def sort_by(sort_criterion: str):
    sorted_list = discover.discover_movies({
        'sort_by': f"{sort_criterion}.desc"
    })
    movie_list = {}
    try:
        for q in sorted_list:
            movie_list[f"{q.id}"] = {"title:": q.title, "overview": q.overview, "poster_path:": q.poster_path}
    except Exception as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie_list}


@user_router.get("/search/book")
async def get_book(query: str):
    try:
        service = build('books', 'v1', developerKey=GOOGLE_API_KEY)
        request = service.volumes().list(q=query, maxResults=15, printType="BOOKS", projection="LITE")
        response = request.execute()
        return response
    except HttpError as e:
        raise 'Error response status code : {0}, reason : {1}'.format(e.status_code, e.error_details)


@user_router.get("/get/book")
async def get_book(query: str):
    try:
        service = build('books', 'v1', developerKey=GOOGLE_API_KEY)
        request = service.volumes().get(volumeId=query)
        response = request.execute()
        return response
    except HttpError as e:
        raise 'Error response status code : {0}, reason : {1}'.format(e.status_code, e.error_details)
