# pylint: disable=no-member, missing-timeout
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users import FastAPIUsers

from src.models.users import User, UserView, UserHistory
from src.config.db.session import get_async_session
from src.models.dals import get_user_manager
from src.api.auth import auth_backend
from src.schemas.auth_schemas import UserRead, UserCreate, UserUpdate
from src.schemas.user import Preferences

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


@user_router.post("/preferences_after_register", tags=["preferences"])
async def preferences_after_register(preferences: Preferences, user: User = Depends(current_user),
                                     session: AsyncSession = Depends(get_async_session)):
    statement = insert(UserView.__table__).values(id=user.id, preferences={"liked_films": [],
                                                                           "liked_books": [],
                                                                           "disliked_films": [],
                                                                           "disliked_books": [],
                                                                           "favorite_genre_books": preferences.book_genre,
                                                                           "favorite_genre_films":
                                                                               preferences.film_genre})
    user.is_preferences = True
    await session.execute(statement)
    await session.commit()
    st = insert(UserHistory.__table__).values(id=user.id, liked_films={}, liked_books={})
    await session.execute(st)
    await session.commit()
