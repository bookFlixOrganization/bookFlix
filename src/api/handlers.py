import uuid

from fastapi import APIRouter, Depends

from src.config.db.auth_session import User
from fastapi_users import fastapi_users, FastAPIUsers
from src.models.dals import get_user_manager
from src.api.auth import auth_backend
from imdb import Cinemagoer, IMDbError
from src.schemas.auth_schemas import UserRead, UserCreate

from tmdbv3api import TMDb, Movie

tmdb = TMDb()
tmdb.api_key = '104110ddcdafacee0b700e98f3a01bb3'
movie = Movie()

user_router = APIRouter()

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
async def get_movie(query: str):
    try:
        movie = ia.get_movie(query)
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": movie}


@user_router.get("/get/person")
async def get_person(query: str):
    try:
        person = ia.get_person(query)
    except IMDbError as e:
        return {"status": "error", "message": e}
    else:
        return {"status": "ok", "result": person}


@user_router.get("/search/keyword")
async def search_keyword(query: str):
    try:
        keywords = ia.search_keyword(query)
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
