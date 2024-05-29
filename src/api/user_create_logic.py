import uuid
from typing import Optional, Union

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, exceptions, models, schemas, UUIDIDMixin
from fastapi_users import InvalidPasswordException

from src.config.db.auth_session import get_user_db
from src.models.users import User

from src.schemas.auth_schemas import UserCreate, UserRead
from src.config.project_config import settings


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    """
    Класс UserManager для управления операциями пользователя.
    Наследует от UUIDIDMixin и BaseUserManager.
    """

    reset_password_token_secret = settings.SECRET
    verification_token_secret = settings.SECRET_VER

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        """
        Метод, вызываемый после регистрации пользователя.
        Печатает сообщение с идентификатором пользователя.

        Parameters:
        user (User): Объект пользователя, который зарегистрировался.
        request (Optional[Request]): Объект запроса (optional).
        """
        print(f"User {user.id} has registered.")

    async def create(
            self,
            user_create: schemas.UC,
            safe: bool = False,
            request: Optional[Request] = None,
    ) -> models.UP:
        """
        Метод создания нового пользователя.
        Проверяет пароль, проверяет наличие существующего пользователя, создает пользовательский словарь,
        хэширует пароль, устанавливает идентификатор роли, создает пользователя в базе данных,
        и вызывает метод on_after_register.

        Parameters:
        user_create (schemas.UC): Схема создания пользователя.
        safe (bool): Флаг, указывающий, следует ли создавать безопасного пользователя (optional, default — False).
        request (Optional[Request]): Объект запроса (optional).

        Returns:
        models.UP: Созданный объект пользователя.
        """
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = (
            user_create.create_update_dict()
            if safe
            else user_create.create_update_dict_superuser()
        )
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)
        user_dict["role_id"] = 1

        created_user = await self.user_db.create(user_dict)

        await self.on_after_register(created_user, request)

        return created_user

    async def on_after_request_verify(
            self, user: User, token: str, request: Optional[Request] = None
    ):
        """
        Метод, вызываемый после того, как пользователь запрашивает проверку.
        Печатает сообщение с идентификатором пользователя и токеном проверки.

        Parameters:
        user (User): Пользовательский объект, запросивший проверку.
        token (str): Токен проверки.
        request (Optional[Request]): Объект запроса (optional).
        """
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def validate_password(
            self,
            password: str,
            user: Union[UserCreate, UserRead],
    ) -> None:
        """
        Метод проверки пароля.
        Проверяет, имеет ли пароль длину не менее 8 символов и не содержит ли адрес электронной почты пользователя.

        Parameters:
        password (str): Пароль для проверки.
        user (Union[UserCreate, UserRead]): Пользовательский объект.

        Raises:
        InvalidPasswordException: Если пароль недействителен.
        """
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(
                reason="Password should not contain e-mail"
            )


async def get_user_manager(user_db=Depends(get_user_db)):
    """
    Асинхронно создает и возвращает экземпляр UserManager.

    Эта функция является зависимостью для маршрутов FastAPI, которым требуется доступ к UserManager.
    Он использует функцию get_user_db в качестве зависимости для получения сеанса базы данных для пользовательских операций.

    Parameters:
    user_db (Optional[UserDB]): Сеанс базы данных для пользовательских операций. Если он не указан, он будет получен с помощью функции get_user_db.

    Yields:
    UserManager: Экземпляр UserManager с предоставленным сеансом базы данных.

    Raises:
    None

    Returns:
    None
    """
    yield UserManager(user_db)
