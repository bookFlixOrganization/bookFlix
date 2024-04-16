import uuid
from datetime import datetime
from sqlalchemy import Column, String, Table, Integer, ForeignKey, JSON, TIMESTAMP, Boolean, ARRAY, MetaData
from sqlalchemy.dialects.postgresql import UUID
# from src.config.db.session import metadata


metadata = MetaData()


role = Table(
    "role",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("permissions", JSON),
)

user = Table(
    "user",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow),
    Column("role_id", Integer, ForeignKey(role.c.id)),
    Column("hashed_password", String, nullable=False),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


user_view = Table(
    "user_views",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("liked_books", ARRAY(String)),
    Column("liked_films", ARRAY(String)),
    Column("disliked_books", ARRAY(String)),
    Column("disliked_films", ARRAY(String)),
    Column("favorite_genre_books", String, nullable=False),
    Column("favorite_genre_films", String, nullable=False)
)

user_history = Table(
    "user_history",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("liked_books", JSON),
    Column("liked_films", JSON)
)
