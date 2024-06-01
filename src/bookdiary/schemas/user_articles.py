# pylint: disable=C0103


"""
Схемы для handlers.py
"""


from uuid import UUID
from typing import List
from pydantic import BaseModel


class User_id(BaseModel):
    """
    Схема для наследования
    """

    user_id: UUID


class AuthorInfo(BaseModel):
    """
    Схема для наследования
    """

    user_name: str
    is_sub: int
    articles_count: int


class Article_id(BaseModel):
    """
    Схема для наследования
    """

    id: UUID


class Publication_date(BaseModel):
    """
    Схема для наследования
    """

    likes: int
    publication_date: str


class Book_info(BaseModel):
    """
    Схема для наследования
    """

    book_name: str
    article_name: str
    text: str


class Book_info_more(Book_info):
    """
    Схема для наследования
    """

    book_authors: List[str]
    book_genre: str


class Create_Article_get(Book_info):
    """
    Схема для получения данных для создания стать
    """


class Create_Article_book_id_get(BaseModel):
    """
    Схема для получения данных для создания стати по id книги
    """

    book_id: str
    article_name: str
    text: str


class User_articles_resp(Create_Article_get, Publication_date):
    """
    Схема для передачи на клиент данных о статей пользователя
    """


class Edit_Article_get(Article_id, Book_info):
    """
    Схема для получения данных для редактирования статьи
    """


class User_Article_info_get(User_id, Article_id):
    """
    Схема для получения информации о статьях пользователя
    """


class Article_Page_info(Book_info_more, Publication_date):
    """
    Схема для наследования
    """


class Article_Page_resp(Article_Page_info):
    """
    Схема для передачи на клиен данных для странички статьи
    """

    user_id: UUID
    user_name: str
    is_sub: int
    is_liked: int


class Author_Page(Article_Page_info, Article_id):
    """
    Схема для странички автора
    """

    articles_count: int
    likes: int


class Author_Page_2(User_id, Book_info, Article_id, Publication_date):
    """
    +Схема для передачи на клиент данных для странички автора
    """

    user_name: str
    book_authors: List[str]
    articles_count: int
    likes: int


class Author_Page_resp(BaseModel):
    """
    Общая схема для странички автора
    """

    author_info: AuthorInfo
    articles: List[Author_Page]


class My_articles_resp(Edit_Article_get):
    """
    Схема для странички "мои статьи"
    """

    book_authors: List[str]
    publication_date: str
