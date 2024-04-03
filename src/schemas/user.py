import uuid

from fastapi import HTTPException
from pydantic import BaseModel

# from src.config.db.session import global_init, create_session
# from src.models.users import User


class UserBase(BaseModel):
    name: str
    surname: str
    email: str
