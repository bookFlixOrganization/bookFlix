# pylint: disable=no-member, missing-timeout
import uuid
import json
import requests
from imdb import Cinemagoer, IMDbError
from fastapi import APIRouter, Depends
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from sqlalchemy import insert, update, select
from tmdbv3api import TMDb, Movie, Search, Discover, exceptions
from fastapi_users import FastAPIUsers


from src.models.users import User, UserView, UserHistory
from src.config.db.session import async_session_maker
from src.config.project_config import settings
from src.models.dals import get_user_manager
from src.api.auth import auth_backend
from src.schemas.auth_schemas import UserRead, UserCreate, UserUpdate
from src.schemas.user import Preferences

tmdb = TMDb()
tmdb.api_key = settings.TMDB_TOKEN
movie = Movie()
search = Search()
discover = Discover()

user_router = APIRouter()
book_router = APIRouter(
    prefix="/book"
)
movie_router = APIRouter(
    prefix="/film"
)
search_router = APIRouter(
    prefix="/search"
)
list_router = APIRouter(
    prefix="/list"
)

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
        statement = insert(UserView.__table__).values(id=user.id, preferences={"liked_films": [],
                                                                               "liked_books": [],
                                                                               "disliked_films": [],
                                                                               "disliked_books": [],
                                                                               "favorite_genre_books": preferences.book_genre,
                                                                               "favorite_genre_films":
                                                                                   preferences.film_genre})
        await session.execute(statement)
        await session.commit()
        st = insert(UserHistory.__table__).values(id=user.id, liked_films={}, liked_books={})
        await session.execute(st)
        await session.commit()


@movie_router.post("/{movie_id}/add_liked_films", tags=["likes"])
async def add_liked_film(liked_movie: str, user: User = Depends(current_user)):
    async with async_session_maker() as session:
        stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
        res = (await session.execute(stmt)).all()
        needed_user_data = res[0][1]
        needed_user_data["liked_films"].append(liked_movie)
        statement = (update(UserView.__table__)
                     .values({"preferences": needed_user_data})
                     .where(UserView.__table__.c.id == user.id))
        await session.execute(statement)
        await session.commit()


@book_router.post("/{book_id}/add_liked_books", tags=["likes"])
async def add_liked_book(liked_book: str, user: User = Depends(current_user)):
    async with async_session_maker() as session:
        stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
        res = (await session.execute(stmt)).all()
        needed_user_data = res[0][1]
        needed_user_data["liked_books"].append(liked_book)
        statement = (update(UserView.__table__)
                     .values({"preferences": needed_user_data})
                     .where(UserView.__table__.c.id == user.id))
        await session.execute(statement)
        await session.commit()


@movie_router.post("/{movie_id}/add_disliked_films", tags=["likes"])
async def add_disliked_film(disliked_movie: str, user: User = Depends(current_user)):
    async with async_session_maker() as session:
        stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
        res = (await session.execute(stmt)).all()
        needed_user_data = res[0][1]
        needed_user_data["disliked_films"].append(disliked_movie)
        statement = (update(UserView.__table__)
                     .values({"preferences": needed_user_data})
                     .where(UserView.__table__.c.id == user.id))
        await session.execute(statement)
        await session.commit()


@book_router.post("/{book_id}/add_disliked_books", tags=["likes"])
async def add_disliked_book(disliked_book: str, user: User = Depends(current_user)):
    async with async_session_maker() as session:
        stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
        res = (await session.execute(stmt)).all()
        needed_user_data = res[0][1]
        needed_user_data["disliked_books"].append(disliked_book)
        statement = (update(UserView.__table__)
                     .values({"preferences": needed_user_data})
                     .where(UserView.__table__.c.id == user.id))
        await session.execute(statement)
        await session.commit()


@movie_router.get("/tmdb_to_imdb", tags=["api_film"])
async def get_imdb_details(movie_id: int):
    try:
        imdb_id = movie.details(movie_id).get(key="imdb_id")[2:]
        return imdb_id

    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@list_router.get("/top_rated_films", tags=["api_film"])
async def top_rated_films_tmdb():
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


@list_router.get("/sorted_films",
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


@movie_router.get("/{movie_id}/similar_films", tags=["api_film"])
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


@movie_router.get("/{movie_id}", tags=["api_film"])
async def get_movie(movie_id: str):
    try:
        movie = ia.get_movie(movie_id)
        return {"status": "ok", "result": movie}
    except IMDbError as e:
        return {"status": "error", "message": e}


@movie_router.get("/person/{person_id}", tags=["api_film"])
async def get_person(person_id: str):
    try:
        person = ia.get_person(person_id)
        return {"status": "ok", "result": person}
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


@book_router.get("/{book_id}", tags=["api_book"])
async def get_book(book_id: str):
    try:
        service = build('books', 'v1', developerKey=settings.GOOGLE_API_KEY)
        request = service.volumes().get(volumeId=book_id)
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@book_router.get("/books_from_author", tags=["api_book"])
async def get_author_info(author_name):
    try:
        url = f"https://www.googleapis.com/books/v1/volumes?q=inauthor:{author_name}&key={settings.GOOGLE_API_KEY}"

        response = requests.get(url)
        data = json.loads(response.text)
        return {"status": "ok", "result": data}
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@list_router.get("/most_popular_books", tags=["api_book"])
async def get_nyt_bestsellers():
    try:
        url = f"https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key={settings.TNY_API_KEY}"

        response = requests.get(url)
        data = json.loads(response.text)
        return {"status": "ok", "result": (data["results"])["lists"][0]["books"]}
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
