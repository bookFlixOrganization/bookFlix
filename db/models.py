import uuid

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()


def User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
