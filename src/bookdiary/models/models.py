from sqlalchemy import BigInteger, DateTime, Integer, JSON, String, Text
from sqlalchemy import Column, Table
from sqlalchemy import text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

BookDiary_Base = declarative_base()


class Publics(BookDiary_Base):
    __tablename__ = "user_publics"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("uuid_generate_v4()"),
    )
    user_id = Column(BigInteger(), nullable=False)
    user_name = Column(String(), nullable=False)
    book_id = Column(String(), nullable=False)
    book_name = Column(String(), nullable=False)
    book_authors = Column(JSON(), nullable=False)
    publication_date = Column(DateTime(), nullable=False)
    article_name = Column(String(50), nullable=False)
    book_genre = Column(String(), nullable=False)
    text = Column(Text(), nullable=False)
    likes = Column(Integer(), default=0)


class Likes(BookDiary_Base):
    __tablename__ = "user_likes"
    user_id = Column(BigInteger(), nullable=False, primary_key=True)
    article_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)


class Subs(BookDiary_Base):
    __tablename__ = "user_subs"
    user_id = Column(BigInteger, nullable=False, primary_key=True)
    sub_id = Column(BigInteger, nullable=False, primary_key=True)
    sub_name = Column(String, nullable=False)
