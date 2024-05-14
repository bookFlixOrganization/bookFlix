import uuid
from fastapi import APIRouter, Depends
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from tmdbv3api import TMDb, Movie, exceptions
from fastapi_users import FastAPIUsers
from imdb import Cinemagoer, IMDbError

from src.api.auth import auth_backend
from src.config.db.session import get_async_session
from src.config.project_config import settings
from src.models.dals import get_user_manager
from src.models.users import UserView, User

movie_router = APIRouter(
    prefix="/film"
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_user = fastapi_users.current_user()
tmdb = TMDb()
tmdb.api_key = settings.TMDB_TOKEN
movie = Movie()
ia = Cinemagoer()


@movie_router.get("/tmdb_to_imdb", tags=["api_film"])
async def get_imdb_details(movie_id: int):
    try:
        imdb_id = movie.details(movie_id).get(key="imdb_id")[2:]
        return imdb_id

    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@movie_router.post("/{movie_id}/add_liked_films", tags=["likes"])
async def add_liked_film(liked_movie_title: str, liked_movie_id: str, user: User = Depends(current_user),
                         session: AsyncSession = Depends(get_async_session)):
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_films"].append([liked_movie_title, liked_movie_id])
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@movie_router.post("/{movie_id}/add_disliked_films", tags=["likes"])
async def add_disliked_film(disliked_movie_title: str, disliked_movie_id: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_films"].append([disliked_movie_title, disliked_movie_id])
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


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
