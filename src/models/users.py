import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, JSON, TIMESTAMP, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID


Base = declarative_base()


class Role(Base):
    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    permissions = Column(JSON)


class User(SQLAlchemyBaseUserTableUUID, Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False)
    username = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    role_id = Column(Integer, ForeignKey("role.id"))
    hashed_password: str = Column(String(length=1024))
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)


class UserView(Base):
    __tablename__ = "user_views"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    preferences = Column(JSON)


class UserHistory(Base):
    __tablename__ = "user_history"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    liked_books = Column(JSON)
    liked_films = Column(JSON)
