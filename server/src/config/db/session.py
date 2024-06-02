from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from src.config.project_config import settings

DATABASE_URL = f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASS}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"

engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Эта функция используется для создания и запуска асинхронного сеанса базы данных.
    Сеанс создается с использованием async_session_maker, который является создателем сеанса.
    настроен с использованием асинхронного механизма.

    Parameters:
    None

    Returns:
    AsyncGenerator[AsyncSession, None]: Асинхронный генератор, который выдает объект AsyncSession.
    """
    async with async_session_maker() as session:
        yield session
