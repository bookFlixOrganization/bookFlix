import uuid
from datetime import datetime

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from sqlalchemy import Column, String, Boolean, Integer, TIMESTAMP, ForeignKey, UUID
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.db.session import Base, get_async_session
from src.models.users import role


class User(SQLAlchemyBaseUserTableUUID, Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False)
    username = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    role_id = Column(Integer, ForeignKey(role.c.id))
    hashed_password: str = Column(String(length=1024))
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)



async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
