from typing import Optional, List

from pydantic import BaseModel


class Preferences(BaseModel):
    film_genre: Optional[List[str]] = None
    book_genre: Optional[List[str]] = None
