import uuid

import sqlalchemy

from src.config.db.session import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID


class User(Base):
    __tablename__ = 'users'
    user_id = Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)