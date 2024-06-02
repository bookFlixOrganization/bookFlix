import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, JSON, TIMESTAMP, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID

Base = declarative_base()


class Role(Base):
    """
    Модель ролей для приложения.

    Attributes:
    - id: Целое число, первичный ключ для таблицы Role.
    - name: Строка, имя роли.
    - permissions: JSON, разрешения, связанные с ролью.
    """

    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    permissions = Column(JSON)


class User(SQLAlchemyBaseUserTableUUID, Base):
    """
    Пользовательская модель для приложения.

    Attributes:
    - id: UUID, первичный ключ для таблицы User.
    - email: Строка, адрес электронной почты пользователя.
    - username: Строка, имя пользователя.
    - registered_at: TIMESTAMP, дата и время регистрации пользователя.
    - role_id: Целое число, внешний ключ к таблице Role.
    - hashed_password: Строка, хешированный пароль для аутентификации пользователя.
    - is_active: Логическое значение, указывает, активен ли пользователь.
    - is_superuser: Логическое значение, указывает, является ли пользователь суперпользователем.
    - is_verified: Логическое значение, указывает, подтвержден ли адрес электронной почты пользователя.
    - is_preferences: Логическое значение, указывает, есть ли у пользователя предпочтения.
    """

    __tablename__ = "user"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False)
    username = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)
    role_id = Column(Integer, ForeignKey("role.id"))
    hashed_password: str = Column(String(length=1024))
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)
    is_preferences: bool = Column(Boolean, default=False, nullable=False)


class UserView(Base):
    """
    Модель UserView для хранения пользовательских настроек.

    Attributes:
    - id: UUID, первичный ключ для таблицы UserView.
    - preferences: JSON, пользовательские предпочтения.
    """

    __tablename__ = "user_views"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    preferences = Column(JSON)


class UserHistory(Base):
    """
    Этот класс представляет историю просмотров пользователя.

    Attributes:
    - id: UUID, первичный ключ для таблицы UserHistory.
    - liked_books: JSON, хранит список книг, понравившихся пользователю.
    - liked_films: JSON, хранит список фильмов, понравившихся пользователю.
    """

    __tablename__ = "user_history"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    liked_books = Column(JSON)
    liked_films = Column(JSON)
