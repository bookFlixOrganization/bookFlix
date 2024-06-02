from typing import Optional, List

from pydantic import BaseModel


class Preferences(BaseModel):
    """
   Класс, используемый для представления пользовательских предпочтений в отношении фильмов и книг.

    Attributes
    film_genre : Optional[List[str]], optional
        Список предпочитаемых киножанров. Значение по умолчанию — None.
    book_genre : Optional[List[str]], optional
        Список предпочитаемых книжных жанров. Значение по умолчанию — None.
    """
    film_genre: Optional[List[str]] = None
    book_genre: Optional[List[str]] = None
