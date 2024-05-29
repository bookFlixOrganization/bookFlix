import uuid
from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    """
    Класс UserRead представляет объект пользователя, который возвращается при чтении пользователя.

    Attributes:
    id (uuid.UUID): Уникальный идентификатор пользователя.
    email (str): Адрес электронной почты пользователя.
    username (str): Имя пользователя пользователя.
    role_id (int): Идентификатор роли пользователя.
    is_active (bool): Указывает, активен пользователь или нет. По умолчанию True.
    is_superuser (bool): Указывает, является ли пользователь суперпользователем или нет. По умолчанию False.
    is_verified (bool): Указывает, проверен ли пользователь. По умолчанию False.
    is_preferences (bool): Указывает, есть ли у пользователя предпочтения или нет. По умолчанию False.
    """

    id: uuid.UUID
    email: str
    username: str
    role_id: int
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    is_preferences: bool = False

    class ConfigDict:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    """
    Класс UserCreate представляет объект пользователя, который используется для создания нового пользователя.

    Attributes:
    username (str): Имя пользователя.
    email (str): Адрес электронной почты пользователя.
    password (str): Пароль пользователя.
    role_id (int): Идентификатор роли пользователя.
    is_active (Optional[bool]): Указывает, активен пользователь или нет. По умолчанию True.
    is_superuser (Optional[bool]): Указывает, является ли пользователь суперпользователем или нет. По умолчанию False.
    is_verified (Optional[bool]): Указывает, проверен ли пользователь. По умолчанию False.
    is_preferences (Optional[bool]): Указывает, есть ли у пользователя предпочтения или нет. По умолчанию False.
    """

    username: str
    email: str
    password: str
    role_id: int
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    is_preferences: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    """
    Класс UserUpdate представляет объект пользователя, который используется для обновления существующего пользователя.
    """
