from typing import List

from src.bookdiary.models.models import Publics, Subs
from src.bookdiary.schemas.exceptions import ConflictException, LenghtException, NotFoundException
from src.bookdiary.schemas.user_subs import UserSubs_operation

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.db.session import get_async_session

router = APIRouter(tags=["Subs"])


def get_current_user_id(user_id: int):
    return user_id


async def get_all_subs_id(
    user_id: int,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)

    async with session.begin():
        stmt = select(Subs).where(Subs.user_id == user_id)
        result = await session.execute(stmt)
    return result.mappings().fetchall()


@router.post("/bookdiary/subs/{sub_id}", status_code=status.HTTP_200_OK)
async def user_subscribe(
    user_id: int,
    sub_id: int,
    sub_name: str,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)
    if user_id == sub_id:
        raise LenghtException(detail="Can't subscribe to yourself")

    async with session.begin():
        stmt = select(Subs).where(Subs.user_id == user_id, Subs.sub_id == sub_id)
        result = (await session.execute(stmt)).scalar_one_or_none()
        if result:
            raise ConflictException(detail="Can't subscribe to this user")
        new_sub = Subs(user_id=user_id, sub_id=sub_id, sub_name=sub_name)
        session.add(new_sub)
        await session.commit()
    return status.HTTP_200_OK


@router.delete("/bookdiary/subs/{sub_id}", status_code=status.HTTP_200_OK)
async def user_unsubscribe(
    user_id: int,
    sub_id: int,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)
    if user_id == sub_id:
        raise LenghtException(detail="Can't unsubscribe from yourself")

    async with session.begin():
        stmt = delete(Subs).where(Subs.user_id == user_id, Subs.sub_id == sub_id)
        result = await session.execute(stmt)
        if result.rowcount == 0:
            raise NotFoundException(detail="Can't find subscribe")
    return status.HTTP_200_OK


@router.get("/bookdiary/subs/my/{user_id}", response_model=List[UserSubs_operation])
async def all_user_subscribes(
    user_id: int,
    session: AsyncSession() = Depends(get_async_session),
):
    user_id = get_current_user_id(user_id)

    async with session.begin():
        stmt = select(Subs).where(Subs.user_id == user_id)
        result = (await session.execute(stmt)).scalars().all()
        if len(result) == 0:
            raise NotFoundException(detail="Nothing found in subs")

        stmt2 = select(Publics.user_id)
        result2 = (await session.execute(stmt2)).fetchall()
        articles_count = [
            result2.count((result[i].user_id,)) for i in range(len(result))
        ]

    return [
        result[i].__dict__ | {"articles_count": articles_count[i]}
        for i in range(len(result))
    ]
