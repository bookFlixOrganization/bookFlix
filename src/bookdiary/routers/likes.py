from src.bookdiary.models.models import Publics, Likes
from src.bookdiary.schemas.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
)

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.db.session import get_async_session

router = APIRouter(tags=["Likes"])


def get_current_user_id(user_id: int):
    return user_id


@router.post("/bookdiary/likes/{article_id}", status_code=status.HTTP_200_OK)
async def user_like_article(
    user_id: int,
    article_id: str,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)

    async with session.begin():
        stmt = select(Likes).where(
            Likes.article_id == article_id,
            Likes.user_id == user_id,
        )
        result = (await session.execute(stmt)).scalar_one_or_none()
        if result:
            raise ConflictException(detail="Can't like this more than 1 time")

        stmt2 = select(Publics).where(Publics.id == article_id)
        result2 = (await session.execute(stmt2)).scalar_one_or_none()
        if not result2:
            raise NotFoundException(detail="Not found this article")
        if result2.user_id == user_id:
            raise ForbiddenException(detail="Can't like yourself")

        stmt3 = (
            update(Publics)
            .where(Publics.id == article_id)
            .values(likes=Publics.likes + 1)
        )
        new_like = Likes(article_id=article_id, user_id=user_id)

        await session.execute(stmt3)
        session.add(new_like)
        await session.commit()
    return status.HTTP_200_OK


@router.delete("/bookdiary/likes/{article_id}", status_code=status.HTTP_200_OK)
async def user_unlike_article(
    user_id: int,
    article_id: str,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)

    async with session.begin():
        stmt = select(Likes).where(
            Likes.article_id == article_id,
            Likes.user_id == user_id,
        )
        result = (await session.execute(stmt)).scalar_one_or_none()
        if not result:
            raise NotFoundException(detail="Can't find user like")

        stmt2 = select(Publics).where(Publics.id == article_id)
        result2 = (await session.execute(stmt2)).scalar_one_or_none()
        if not result2:
            raise NotFoundException(detail="Not found this article")

        stmt3 = (
            update(Publics)
            .where(Publics.id == article_id)
            .values(likes=Publics.likes - 1)
        )
        stmt4 = delete(Likes).where(
            Likes.article_id == article_id,
            Likes.user_id == user_id,
        )

        await session.execute(stmt3)
        await session.execute(stmt4)
        await session.commit()
    return status.HTTP_200_OK
