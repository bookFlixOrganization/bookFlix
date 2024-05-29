from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.db.session import get_async_session
from src.models.users import User


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    """
    Эта функция представляет собой внедрение зависимостей для библиотеки FastAPI-Users. Он предоставляет экземпляр
    SQLAlchemyUserDatabase для управления пользовательскими данными.

    Parameters:
    session (AsyncSession): Асинхронный сеанс базы данных, предоставляемый приложением FastAPI.
                            Он вводится с помощью функции get_async_session.
                            Значение по умолчанию — Depends(get_async_session).

    Yields:
    SQLAlchemyUserDatabase: Экземпляр SQLAlchemyUserDatabase для управления пользовательскими данными.

    Note:
    Эта функция предназначена для использования в качестве зависимости в маршрутах FastAPI. Должен быть
    включен в список зависимостей функции-обработчика маршрута.
    """
    yield SQLAlchemyUserDatabase(session, User)
