import uuid

import sqlalchemy

from src.config.db.session import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID


class User(Base):
    __tablename__ = 'users'
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)