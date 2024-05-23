from pydantic import BaseModel
from typing import List
from uuid import UUID


class User_id(BaseModel):
    user_id: UUID


class AuthorInfo(BaseModel):
    user_name: str
    is_sub: int
    articles_count: int


class Article_id(BaseModel):
    id: UUID


class Publication_date(BaseModel):
    likes: int
    publication_date: str


class Book_info(BaseModel):
    book_name: str
    article_name: str
    text: str


class Book_info_more(Book_info):
    book_authors: List[str]
    book_genre: str


class Create_Article_get(Book_info):
    pass


class User_articles_resp(Create_Article_get, Publication_date):
    pass


class Edit_Article_get(Article_id, Book_info):
    pass


class User_Article_info_get(User_id, Article_id):
    pass


class Article_Page_info(Book_info_more, Publication_date):
    pass


class Article_Page_resp(Article_Page_info):
    user_id: UUID
    user_name: str
    is_sub: int
    is_liked: int


class Author_Page(Article_Page_info, Article_id):
    articles_count: int


class Author_Page_2(User_id, Book_info, Article_id, Publication_date):
    user_name: str
    book_authors: List[str]
    articles_count: int
    likes: int


class Author_Page_resp(BaseModel):
    author_info: AuthorInfo
    articles: List[Author_Page]
    likes: int


class My_articles_resp(Edit_Article_get):
    book_authors: List[str]
    publication_date: str
