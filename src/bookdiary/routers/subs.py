"""
Модуль содержит обработчики маршрутов для работы с подписками в приложении BookDiary.
"""

import uuid

from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status

from fastapi_users import FastAPIUsers
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.auth import auth_backend
from src.bookdiary.models.models import Publics, Subs
from src.bookdiary.schemas.exceptions import (
    ConflictException,
    LenghtException,
    NotFoundException,
)
from src.bookdiary.schemas.user_subs import UserSubs_operation
from src.config.db.session import get_async_session
from src.models.dals import get_user_manager
from src.models.users import User


router = APIRouter(tags=["Subs"])


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_user = fastapi_users.current_user()


async def get_all_subs_id(
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Функция, которая получает все подписки по id
    """

    stmt = select(Subs).where(Subs.user_id == user.id)
    result = await session.execute(stmt)
    return result.mappings().fetchall()


@router.post("/bookdiary/subs/{sub_id}", status_code=status.HTTP_201_CREATED)
async def user_subscribe(
    sub_id: uuid.UUID,
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, который отвечает за создание подписки
    """
    if user.id == sub_id:
        raise LenghtException(detail="Can't subscribe to yourself")

    stmt = select(Subs).where(Subs.user_id == user.id, Subs.sub_id == sub_id)
    result = (await session.execute(stmt)).scalar_one_or_none()
    if result:
        raise ConflictException(detail="Can't subscribe to this user")
    new_sub = Subs(user_id=user.id, sub_id=sub_id)
    session.add(new_sub)
    await session.commit()
    return status.HTTP_200_OK


@router.delete("/bookdiary/subs/{sub_id}", status_code=status.HTTP_204_NO_CONTENT)
async def user_unsubscribe(
    sub_id: uuid.UUID,
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, который отвечает за отписку
    """
    if user.id == sub_id:
        raise LenghtException(detail="Can't unsubscribe from yourself")

    stmt = delete(Subs).filter(Subs.user_id == user.id, Subs.sub_id == sub_id)
    result = await session.execute(stmt)
    if result.rowcount == 0:
        raise NotFoundException(detail="Can't find subscribe")
    await session.commit()

    return status.HTTP_200_OK


@router.get("/bookdiary/subs/my", response_model=List[UserSubs_operation])
async def all_user_subscribes(
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, который отвечает за получение всех подписок данного юзера
    """
    stmt = select(Subs).where(Subs.user_id == user.id)
    result = (await session.execute(stmt)).scalars().all()
    if len(result) == 0:
        raise NotFoundException(detail="Nothing found in subs")

    filter_cond = Publics.user_id.in_([elem.sub_id for elem in result])
    stmt2 = select(Publics.user_id).where(filter_cond)
    result2 = (await session.execute(stmt2)).fetchall()
    articles_count = {result[i].sub_id: result2.count((result[i].sub_id,)) for i in range(len(result))}
    print(articles_count)
    filter_cond2 = User.id.in_({i.sub_id for i in result})
    stmt3 = select(User.id, User.username).where(filter_cond2)
    result3 = (await session.execute(stmt3)).mappings().fetchall()

    usernames = {result3[i].id: result3[i].username for i in range(len(result3))}

    return [
        result[i].__dict__
        | {"articles_count": articles_count[result[i].sub_id], "sub_name": usernames[result[i].sub_id]}
        for i in range(len(result))
    ]
