# pylint: disable=no-member, missing-timeout
import uuid
import json
import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_users import FastAPIUsers
from langchain.schema import HumanMessage
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from src.api.auth import auth_backend
from src.api.gigachat import gigachat_router, prompt_for_recommendation_movies, chat
from src.api.user_handlers import user_router
from src.config.db.session import get_async_session
from src.config.project_config import settings
from src.api.user_create_logic import get_user_manager
from src.models.users import User, UserView

book_router = APIRouter(
    prefix="/book"
)
fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_user = fastapi_users.current_user()
service = build('books', 'v1', developerKey=settings.GOOGLE_API_KEY)


@book_router.post("/{book_id}/add_liked_books", tags=["likes"])
async def add_liked_book(liked_book_title: str, liked_book_id: str, user: User = Depends(current_user),
                         session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция добавляет понравившуюся книгу в предпочтения пользователя.

    Parameters:
    liked_book_title (str): Название понравившейся книги.
    liked_book_id (str): Уникальный идентификатор понравившейся книги.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Raises:
    None.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_books"].append([liked_book_title, liked_book_id])
    history = needed_user_data["history_books"]
    if [liked_book_title, liked_book_id] in history:
        history.remove([liked_book_title, liked_book_id])
    history.append([liked_book_title, liked_book_id])
    needed_user_data["history_books"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@book_router.post("/{book_id}/add_disliked_books", tags=["likes"])
async def add_disliked_book(disliked_book_title: str, disliked_book_id: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция добавляет нелюбимую книгу в предпочтения пользователя.

    Parameters:
    disliked_book_title (str): Название нелюбимой книги.
    disliked_book_id (str): Уникальный идентификатор не понравившейся книги.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Raises:
    None.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_books"].append([disliked_book_title, disliked_book_id])
    history = needed_user_data["history_books"]
    if [disliked_book_title, disliked_book_id] in history:
        history.remove([disliked_book_title, disliked_book_id])
    history.append([disliked_book_title, disliked_book_id])
    needed_user_data["history_books"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@book_router.post("/{book_id}/delete_liked_books", tags=["likes"])
async def delete_liked_book(liked_book_title: str, liked_book_id: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция удаляет понравившуюся книгу из предпочтений пользователя.

    Parameters:
    liked_book_title (str): Название понравившейся книги, которую нужно удалить.
    liked_book_id (str): Уникальный идентификатор понравившейся книги, которую нужно удалить.
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Raises:
    None.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_books"].remove([liked_book_title, liked_book_id])
    history = needed_user_data["history_books"]
    if [liked_book_title, liked_book_id] in history:
        history.remove([liked_book_title, liked_book_id])
    history.append([liked_book_title, liked_book_id])
    needed_user_data["history_books"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@book_router.post("/{book_id}/delete_disliked_books", tags=["likes"])
async def delete_disliked_book(disliked_book_title: str, disliked_book_id: str, user: User = Depends(current_user),
                               session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция удаляет нелюбимую книгу из предпочтений пользователя.

    Parameters:
    disliked_book_title (str): Название не понравившейся книги будет удалено.
    disliked_book_id (str): Уникальный идентификатор не понравившейся книги, которую нужно удалить..
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    None.

    Raises:
    None.
    """
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_books"].remove([disliked_book_title, disliked_book_id])
    history = needed_user_data["history_books"]
    if [disliked_book_title, disliked_book_id] in history:
        history.remove([disliked_book_title, disliked_book_id])
    history.append([disliked_book_title, disliked_book_id])
    needed_user_data["history_books"] = history
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@book_router.get("/{book_id}", tags=["api_book"])
def get_book(book_id: str):
    """
    Эта функция получает информацию о книге с помощью API Google Книг.

    Parameters:
    book_id (str): Уникальный идентификатор книги.

    Returns:
    dict: Словарь, содержащий информацию о книге.

    Raises:
    HttpError: Если HTTP-запрос к API Google Книг не выполнен.
    """
    try:
        request = service.volumes().get(volumeId=book_id)
        response = request.execute()
        return response
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@book_router.get("/books_from_author", tags=["api_book"])
def get_author_info(author_name):
    """
    Эта функция получает информацию о книге из API Google Книг на основе имени автора.

    Parameters:
    author_name (str): Имя автора, книги которого необходимо получить.

    Returns:
    dict: Словарь, содержащий статус и результат запроса API.
          Ключ «status» будет иметь значение «ok», если запрос успешен.
          Ключ «result» будет иметь значение ответа JSON от API.

    Raises:
    HttpError: Если HTTP-запрос к API Google Книг не выполнен.
    """
    try:
        url = f"https://www.googleapis.com/books/v1/volumes?q=inauthor:{author_name}&key={settings.GOOGLE_API_KEY}"

        response = requests.get(url)
        data = json.loads(response.text)
        return {"status": "ok", "result": data}
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@user_router.get("/favourite/added_book", tags=["preferences"])
async def added_books(user: User = Depends(current_user),
                      session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция получает список книг, добавленных пользователем.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь с идентификаторами книг в качестве ключей и соответствующей информацией о книгах в качестве значений.

    Raises:
    AttributeError: Если у объекта пользователя нет атрибута предпочтений.
    HTTPException: Если HTTP-запрос к API Google Книг не выполнен.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_books = user_view.preferences['liked_books']
        added_books_list = {}

        for book in added_books:
            added_books_list[book[1]] = service.volumes().get(volumeId=book[1]).execute()

        return added_books_list

    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e

    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@gigachat_router.get("/recommendation_book")
async def recommendation_book(user: User = Depends(current_user),
                              session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция генерирует рекомендации книг на основе понравившихся пользователю книг.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь, содержащий идентификаторы книг в качестве ключей и соответствующую информацию о книгах в качестве значений.

    Raises:
    AttributeError: Если у объекта пользователя нет атрибута предпочтений.
    HTTPException: Если HTTP-запрос к API Google Книг не выполнен.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_books_names = [movie[0].lower() for movie in user_view.preferences['liked_books']]
        if len(added_books_names) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        text = prompt_for_recommendation_movies.format(titles=", ".join(added_books_names))
        response = [movie for movie in chat([HumanMessage(content=text)]).content.strip().split(", ") if
                    movie.lower() not in added_books_names]
        book_list = {}
        for title in response:
            request = service.volumes().list(q=title, maxResults=15, printType="BOOKS", projection="LITE")
            response = request.execute()["items"][0]
            book_list[response["id"]] = response
        return book_list
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'


@user_router.get("/favourite/history_book", tags=["preferences"])
async def added_books(user: User = Depends(current_user),
                      session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция извлекает историю книг, добавленных пользователем.

    Parameters:
    user (User): Пользовательский объект, представляющий текущего пользователя.
    session (AsyncSession): Асинхронный сеанс базы данных для выполнения запросов.

    Returns:
    dict: Словарь, содержащий идентификаторы книг в качестве ключей и соответствующие сведения о книге в качестве значений.

    Raises:
    AttributeError: Если у объекта пользователя нет атрибута предпочтений.
    HTTPException: Если HTTP-запрос к API Google Books не выполнен.
    """
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        added_books = user_view.preferences['history_books']
        added_books_list = {}

        for book in added_books:
            added_books_list[book[1]] = service.volumes().get(volumeId=book[1]).execute()

        return added_books_list

    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e

    except HttpError as e:
        raise f'Error response status code : {e.status_code}, reason : {e.error_details}'
