# pylint: disable=no-member
import uuid
from imdb import Cinemagoer, IMDbError
from fastapi import APIRouter, Depends
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from sqlalchemy import insert
from tmdbv3api import TMDb, Movie, Search, Discover, exceptions
from fastapi_users import FastAPIUsers

from src.config.db.auth_session import User
from src.config.db.session import async_session_maker
from src.config.project_config import TMDB_TOKEN
from src.config.project_config import GOOGLE_API_KEY
from src.models.dals import get_user_manager
from src.api.auth import auth_backend
from src.models.users import user_view, user_history
from src.schemas.auth_schemas import UserRead, UserCreate, UserUpdate
from src.schemas.user import Preferences

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

user_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)

user_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

current_user = fastapi_users.current_user()
ia = Cinemagoer()


@user_router.post("/preferences_after_register", tags=["preferences"])
async def preferences_after_register(preferences: Preferences, user: User = Depends(current_user)):
    async with async_session_maker() as session:
        statement = insert(user_view).values(id=user.id, preferences={"liked_films": [],
                                                                      "liked_books": [],
                                                                      "disliked_films": [],
                                                                      "disliked_books": [],
                                                                      "favorite_genre_books": preferences.book_genre,
                                                                      "favorite_genre_films":
                                                                          preferences.film_genre})
        await session.execute(statement)
        await session.commit()
        st = insert(user_history).values(id=user.id, liked_films={}, liked_books={})
        await session.execute(st)
        await session.commit()


@user_router.get("/tmdb/tmdb_to_imdb", tags=["api_film"])
async def get_imdb_details(movie_id: int):
    try:
        imdb_id = movie.details(movie_id).get(key="imdb_id")[2:]
        imdb_details = ia.get_movie(imdb_id)
        return {"status": "ok", "result": imdb_details}

    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/tmdb/top_rated", tags=["api_film"])
async def get_top_rated():
    movie_list = movie.top_rated()
    try:
        top_rated = {}

        for p in movie_list:
            top_rated[f"{p.id}"] = {"title:": p.title, "overview": p.overview,
                                    "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{p.poster_path}",
                                    "imdb_id": p.imdb_id[2:]}
        return {"status": "ok", "result": top_rated}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


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
            movie_list[f"{q.id}"] = {"title:": q.title, "overview": q.overview,
                                     "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{q.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@user_router.get("/tmdb/similar", tags=["api_film"])
async def get_similar(movie_id: int):
    similar = movie.similar(movie_id)
    movie_list = {}
    try:
        for q in similar:
            movie_list[f"{q.id}"] = {"title:": q.title, "overview": q.overview,
                                     "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{q.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@user_router.get("/search/tmdb/movie", tags=["api_film"])
async def search_movie_tmdb(title_eng: str):
    try:
        tmdb_films = search.movies(title_eng)
        movie_list = {}

        for p in tmdb_films:
            movie_list[f"{p.id}"] = {"title:": p.title, "overview": p.overview,
                                     "vote_average": p.vote_average,
                                     "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{p.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@user_router.get("/get/tmdb/movie", tags=["api_film"])
async def get_movie_tmdb(movie_id: int):
    try:
        movie_tmdb = movie.details(movie_id)
        return {"status": "ok", "result": movie_tmdb}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@user_router.get("/get/tmdb/top", tags=["api_film"])
async def get_top():
    try:
        movie_list = {}
        popular = movie.popular()
        for p in popular:
            movie_list[f"{p.id}"] = {"title:": p.title, "overview": p.overview,
                                     "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{p.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@user_router.get("/search/movie", tags=["api_film"])
async def search_movie(query: str):
    try:
        movies = ia.search_movie(query)
        for i in range(len(movies)):
            movies[i]['movieID'] = movies[i].movieID
        return {"status": "ok", "result": movies}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/search/person", tags=["api_film"])
async def search_person(query: str):
    try:
        peoples = ia.search_person(query)
        for i in range(len(peoples)):
            peoples[i]['personID'] = peoples[i].personID
        return {"status": "ok", "result": peoples}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/get/movie", tags=["api_film"])
async def get_movie(movie_id: str):
    try:
        movie = ia.get_movie(movie_id)
        return {"status": "ok", "result": movie}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/get/person", tags=["api_film"])
async def get_person(person_id: str):
    try:
        person = ia.get_person(person_id)
        return {"status": "ok", "result": person}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/search/keyword", tags=["api_film"])
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


@user_router.get("/get/keyword", tags=["api_film"])
async def get_keyword(query: str):
    try:
        keyword = ia.get_keyword(query)
        return {"status": "ok", "result": keyword}
    except IMDbError as e:
        return {"status": "error", "message": e}


@user_router.get("/search/book", tags=["api_book"])
async def search_book(query: str):
    try:
        service = build('books', 'v1', developerKey=GOOGLE_API_KEY)
        request = service.volumes().list(q=query, maxResults=15, printType="BOOKS", projection="LITE")
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@user_router.get("/get/book", tags=["api_book"])
async def get_book(query: str):
    try:
        service = build('books', 'v1', developerKey=GOOGLE_API_KEY)
        request = service.volumes().get(volumeId=query)
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
