# pylint: disable=no-member, missing-timeout
import uuid
import json
import requests
from fastapi import APIRouter, Depends
from fastapi_users import FastAPIUsers
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from src.api.auth import auth_backend
from src.config.db.session import get_async_session
from src.config.project_config import settings
from src.models.dals import get_user_manager
from src.models.users import User, UserView

book_router = APIRouter(
    prefix="/book"
)
fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_user = fastapi_users.current_user()


@book_router.post("/{book_id}/add_liked_books", tags=["likes"])
async def add_liked_book(liked_book: str, user: User = Depends(current_user),
                         session: AsyncSession = Depends(get_async_session)):
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["liked_books"].append(liked_book)
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


@book_router.post("/{book_id}/add_disliked_books", tags=["likes"])
async def add_disliked_book(disliked_book: str, user: User = Depends(current_user),
                            session: AsyncSession = Depends(get_async_session)):
    stmt = select(UserView.__table__).where(UserView.__table__.c.id == user.id)
    res = (await session.execute(stmt)).all()
    needed_user_data = res[0][1]
    needed_user_data["disliked_books"].append(disliked_book)
    statement = (update(UserView.__table__)
                 .values({"preferences": needed_user_data})
                 .where(UserView.__table__.c.id == user.id))
    await session.execute(statement)
    await session.commit()


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
