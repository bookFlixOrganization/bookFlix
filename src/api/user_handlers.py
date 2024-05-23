import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import insert, select, update
from sqlalchemy.exc import SQLAlchemyError
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
                                                                           "favorite_genre_books":
                                                                               preferences.book_genre,
                                                                           "favorite_genre_films":
                                                                               preferences.film_genre,
                                                                           "history_books": [],
                                                                           "history_movies": []})
    user.is_preferences = True
    await session.execute(statement)
    await session.commit()
    st = insert(UserHistory.__table__).values(id=user.id, liked_films={}, liked_books={})
    await session.execute(st)
    await session.commit()


@user_router.get("/favourite", tags=["preferences"])
async def favourites(user: User = Depends(current_user),
                     session: AsyncSession = Depends(get_async_session)):
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_view = result.first()
        return user_view.preferences
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)) from e


@user_router.post("/preferences_edit", tags=["preferences"])
async def preferences_after_register(preferences: Preferences, user: User = Depends(current_user),
                                     session: AsyncSession = Depends(get_async_session)):
    try:
        statement = select(UserView.__table__).where(UserView.id == user.id)
        result = await session.execute(statement)
        user_preferences = result.first()
        preferences_json = user_preferences.preferences
        preferences_json["favorite_genre_books"] = preferences.book_genre
        preferences_json["favorite_genre_films"] = preferences.film_genre
        stmt = update(UserView.__table__).where(UserView.id == user.id).values(preferences=preferences_json)
        await session.execute(stmt)
        await session.commit()
    except AttributeError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e)) from e
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
