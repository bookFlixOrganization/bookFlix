from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID


class User_id(BaseModel):
    user_id: int


class AuthorInfo(BaseModel):
    user_name: str
    is_sub: int
    articles_count: int


class Article_id(BaseModel):
    id: UUID


class Publication_date(BaseModel):
    likes: int
    publication_date: datetime


class Book_info(BaseModel):
    book_name: str
    article_name: str
    text: str


class Book_info_more(Book_info):
    book_authors: List[str]
    book_genre: str


class Create_Article_get(Book_info, User_id):
    user_name: str
    pass


class User_articles_resp(Create_Article_get, Publication_date):
    pass


class Edit_Article_get(Article_id, Book_info):
    pass


class User_Article_info_get(User_id, Article_id):
    pass


class Article_Page_info(User_id, Book_info_more, Publication_date):
    user_name: str


class Article_Page_resp(Article_Page_info):
    is_sub: int


class Author_Page(Article_Page_info, Article_id):
    articles_count: int


class Author_Page_2(User_id, Book_info, Article_id, Publication_date):
    book_authors: List[str]
    articles_count: int


class Author_Page_resp(BaseModel):
    author_info: AuthorInfo
    articles: List[Author_Page_2]


class My_articles_resp(Edit_Article_get):
    book_authors: List[str]
    publication_date: datetime
    pass
