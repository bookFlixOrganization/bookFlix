from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from db_config import DATABASE_URL

engine = create_async_engine("postgresql+asyncpg://postgres:postgres@localhost:5432/postgres", echo=True, future=True)
