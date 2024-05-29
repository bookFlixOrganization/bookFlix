import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from langchain.schema import HumanMessage
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from tmdbv3api import TMDb, Movie, exceptions
from fastapi_users import FastAPIUsers
from imdb import Cinemagoer, IMDbError

from src.api.auth import auth_backend
from src.api.gigachat import gigachat_router, chat, prompt_for_recommendation_movies
from src.api.user_handlers import user_router
from src.config.db.session import get_async_session
from src.config.project_config import settings
from src.api.user_create_logic import get_user_manager
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


@movie_router.get("/tmdb_to_imdb", tags=["Movie"])
def get_imdb_details(movie_id: int):
    """
    Эта функция извлекает идентификатор фильма IMDb из базы данных TMDb.

    Parameters:
    movie_id (int): Идентификатор фильма в базе данных TMDb.

    Returns:
    str or dict: Если идентификатор IMDb успешно получен, он возвращает идентификатор IMDb в виде строки.
                 Если в процессе поиска возникает ошибка, он возвращает словарь с
                 «status» — «error» и «message», содержащее сведения об ошибке.

    Raises:
    exceptions.TMDbException: Если при выполнении запроса к API TMDb возникает ошибка.
    """
    try:
        imdb_id = movie.details(movie_id).get(key="imdb_id")[2:]
        return imdb_id

    except exceptions.TMDbException as e:
        return {"status": "error", "message": str(e)}


@movie_router.post("/{movie_id}/add_liked_films", tags=["Movie"])
async def add_liked_film(liked_movie_title: str, liked_movie_id: str, user: User = Depends(current_user),
                         session: AsyncSession = Depends(get_async_session)):
    """
    Добавляет понравившийся фильм в предпочтения пользователя.

    Parameters:
    liked_movie_title (str): Название понравившегося фильма.
    liked_movie_id (str): Идентификатор понравившегося фильма.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Side Effects:
    Обновляет предпочтения пользователя в базе данных, добавляя понравившийся фильм в список понравившихся фильмов.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_films"].append([liked_movie_title, liked_movie_id])
    history = needed_user_data["history_movies"]
    if [liked_movie_title, liked_movie_id] in history:
        history.remove([liked_movie_title, liked_movie_id])
    history.append([liked_movie_title, liked_movie_id])
    needed_user_data["history_movies"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@movie_router.post("/{movie_id}/add_disliked_films", tags=["Movie"])
async def add_disliked_film(disliked_movie_title: str, disliked_movie_id: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    """
    Добавляет не понравившийся фильм в предпочтения пользователя.

    Parameters:
    disliked_movie_title (str): Название не понравившегося фильма.
    disliked_movie_id (str): Идентификатор не понравившегося фильма.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Side Effects:
    Обновляет предпочтения пользователя в базе данных, добавляя не понравившийся фильм в список нелюбимых фильмов.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_films"].append([disliked_movie_title, disliked_movie_id])
    history = needed_user_data["history_movies"]
    if [disliked_movie_title, disliked_movie_id] in history:
        history.remove([disliked_movie_title, disliked_movie_id])
    history.append([disliked_movie_title, disliked_movie_id])
    needed_user_data["history_movies"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@movie_router.post("/{movie_id}/delete_liked_films", tags=["Movie"])
async def delete_liked_film(liked_movie_title: str, liked_movie_id: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    """
    Удаляет понравившийся фильм из предпочтений пользователя.

    Parameters:
    liked_movie_title (str): Название понравившегося фильма, который нужно удалить.
    liked_movie_id (str): Идентификатор понравившегося фильма, который нужно удалить.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Side Effects:
    Обновляет предпочтения пользователя в базе данных, удаляя указанный понравившийся фильм.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_films"].remove([liked_movie_title, liked_movie_id])
    history = needed_user_data["history_movies"]
    if [liked_movie_title, liked_movie_id] in history:
        history.remove([liked_movie_title, liked_movie_id])
    history.append([liked_movie_title, liked_movie_id])
    needed_user_data["history_movies"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@movie_router.post("/{movie_id}/delete_disliked_films", tags=["Movie"])
async def delete_disliked_film(disliked_movie_title: str, disliked_movie_id: str, user: User = Depends(current_user),
                               session: AsyncSession = Depends(get_async_session)):
    """
    Удаляет не понравившийся фильм из предпочтений пользователя.

    Parameters:
    disliked_movie_title (str): Название нелюбимого фильма.
    disliked_movie_id (str): Идентификатор не понравившегося фильма.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Side Effects:
    Обновляет предпочтения пользователя в базе данных, удаляя не понравившийся фильм.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_films"].remove([disliked_movie_title, disliked_movie_id])
    history = needed_user_data["history_movies"]
    if [disliked_movie_title, disliked_movie_id] in history:
        history.remove([disliked_movie_title, disliked_movie_id])
    history.append([disliked_movie_title, disliked_movie_id])
    needed_user_data["history_movies"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@movie_router.get("/{movie_id}/similar_films", tags=["Movie"])
def get_similar(movie_id: int):
    """
    Эта функция извлекает похожие фильмы из API TMDb на основе заданного идентификатора фильма.

    Parameters:
    movie_id (int): Идентификатор фильма, для которого необходимо получить похожие фильмы.

    Returns:
    dict: Словарь, содержащий похожие фильмы. Ключами являются идентификаторы фильмов, а значениями — словари, содержащие сведения о фильме (название, обзор и путь к обложке).

    Raises:
    exceptions.TMDbException: Если при выполнении запроса API к TMDb возникает ошибка.

    """
    similar = movie.similar(movie_id)
    movie_list = {}
    try:
        for q in similar:
            movie_list[f"{q.id}"] = {"title:": q.title, "overview": q.overview,
                                     "poster_path:": f"https://image.tmdb.org/t/p/w220_and_h330_face{q.poster_path}"}
        return {"status": "ok", "result": movie_list}
    except exceptions.TMDbException as e:
        return {"status": "error", "message": e}


@movie_router.get("/{movie_id}", tags=["Movie"])
def get_movie(movie_id: str) -> dict:
    """
    Эта функция извлекает фильм из базы данных IMDb, используя предоставленный movie_id.

    Parameters:
    movie_id (str): Уникальный идентификатор фильма в базе данных IMDb.

    Returns:
    dict: Словарь, содержащий статус операции и полученные данные фильма.
          Если операция прошла успешно, статус будет «ok», а результат будет содержать данные фильма.
          В случае возникновения ошибки статус будет «error», а сообщение будет содержать сведения об ошибке.

    Raises:
    IMDbError: Если возникает ошибка при получении данных фильма из базы данных IMDb.
    """
    try:
        movie = ia.get_movie(movie_id)
        return {"status": "ok", "result": movie}
    except IMDbError as e:
        return {"status": "error", "message": str(e)}


@movie_router.get("/person/{person_id}", tags=["Movie"])
def get_person(person_id: str) -> dict:
    """
    Эта функция извлекает человека из базы данных IMDb, используя предоставленный person_id.

    Parameters:
    person_id (str): Уникальный идентификатор человека в базе данных IMDb.

    Returns:
    dict: Словарь, содержащий статус операции и полученные данные о человеке.
          Если операция прошла успешно, статус будет «ok», а результат будет содержать данные о человеке.
          В случае ошибки статус будет «error», а сообщение будет содержать информацию об ошибке.

    Raises:
    IMDbError: Если возникает ошибка при получении данных о человеке из базы данных IMDb.
    """
    try:
        person = ia.get_person(person_id)
        return {"status": "ok", "result": person}
    except IMDbError as e:
        return {"status": "error", "message": str(e)}


@user_router.get("/favourite/added_movie", tags=["Preferences"])
async def added_movie(user: User = Depends(current_user),
                      session: AsyncSession = Depends(get_async_session)):
    """
    Получить из базы данных список добавленных пользователем фильмов.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь, содержащий добавленные фильмы. Ключами являются идентификаторы фильмов, а значениями — объекты фильмов.

    Raises:
    HTTPException: Если объект пользователя не найден в базе данных.
    IMDbError: Если возникла ошибка при получении данных фильма из базы данных IMDb.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_movies = user_view.preferences['liked_films']
        added_movies_list = {}
        for movie in added_movies:
            added_movies_list[movie[1]] = ia.get_movie(movie[1])
        return added_movies_list
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except IMDbError as e:
        raise f'Error response, message: {e}'


@gigachat_router.get("/recommendation_movie")
async def recommendation_movie(user: User = Depends(current_user),
                               session: AsyncSession = Depends(get_async_session)):
    """
    Получайте рекомендации фильмов на основе понравившихся пользователю фильмов.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь, содержащий рекомендуемые фильмы. Ключи — это идентификаторы фильмов, а значения — объекты фильмов.

    Raises:
    HTTPException: Если объект пользователя не найден в базе данных.
    IMDbError: Если произошла ошибка при получении данных фильма из базы данных IMDb.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_movies_names = [movie[0].lower() for movie in user_view.preferences['liked_films']]
        if len(added_movies_names) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        text = prompt_for_recommendation_movies.format(titles=", ".join(added_movies_names))
        response = [movie for movie in chat([HumanMessage(content=text)]).content.strip().split(", ") if
                    movie.lower() not in added_movies_names]
        movies_list = {}
        for title in response:
            movies_list[ia.search_movie(title)[0].movieID] = ia.search_movie(title)[0]
        return movies_list
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except IMDbError as e:
        raise f'Error response, message: {e}'


@user_router.get("/favourite/history_movies", tags=["Preferences"])
async def history_movie(user: User = Depends(current_user),
                        session: AsyncSession = Depends(get_async_session)):
    """
    Получить историю фильмов, добавленных пользователем, из базы данных.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь, содержащий историю фильмов, добавленных пользователем.
          Ключи — это идентификаторы фильмов, а значения — объекты фильмов.

    Raises:
    HTTPException: Если объект пользователя не найден в базе данных.
    IMDbError: Если произошла ошибка при получении данных фильма из базы данных IMDb.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_movies = user_view.preferences['history_movies']
        added_movies_list = {}
        for movie in added_movies:
            added_movies_list[movie[1]] = ia.get_movie(movie[1])
        return added_movies_list
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except IMDbError as e:
        raise f'Error response, message: {e}'
