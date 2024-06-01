"""
Модуль содержит обработчики маршрутов для работы с статьями в приложении BookDiary.
"""

import uuid
from typing import List

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    status,
)  # Упорядочивание импортов
from fastapi_users import FastAPIUsers

from sqlalchemy import delete, desc, select, update
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.auth import auth_backend
from src.api.user_create_logic import get_user_manager
from src.bookdiary.mailer import email_prepare_data_send
from src.bookdiary.models.models import Publics, Subs, Likes
from src.bookdiary.routers.search_handlers import prepare_article_data, search_books
from src.bookdiary.schemas.exceptions import (
    ConflictException,
    LenghtException,
    NotFoundException,
    ServerException,
)
from src.bookdiary.schemas.user_articles import (
    Article_Page_resp,
    Author_Page_2,
    Author_Page_resp,
    Book_info,
    Create_Article_get,
    Create_Article_book_id_get,
    Edit_Article_get,
    My_articles_resp,
)
from src.config.db.session import get_async_session
from src.config.project_config import settings
from src.models.users import User


router = APIRouter(
    tags=["Article"],
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user()


async def get_books_id_by_query(query: str):
    """
    Получение списка id книг для поиска статей
    """
    books_data = search_books(query)["items"]
    booksname = [book["id"] for book in books_data]
    return booksname


async def valid_length_exception(this: int, maximum: int, minimum: int, detail: str):
    """
    Проверяет, находится ли длина данных в допустимом диапазоне.

    Args:
        this (int): Текущая длина данных.
        maximum (int): Максимально допустимая длина.
        minimum (int): Минимально допустимая длина.
        detail (str): Описание элемента, длина которого проверяется.

    Raises:
        LenghtException: Если длина данных не находится в диапазоне от minimum до maximum.
    """
    if maximum < this or this < minimum:
        raise (
            LenghtException(
                detail=f"{detail} must be between {minimum} and {maximum} characters long",
            )
        )


@router.post("/bookdiary/articles/new", status_code=status.HTTP_201_CREATED)
async def create_article(
    tasks: BackgroundTasks,
    user: User = Depends(current_user),
    data: dict = Depends(Create_Article_get),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за создание статьи по названию
    """
    await valid_length_exception(
        len(data.article_name),
        settings.ARTICLE_NAME_MAX_LENGTH,
        settings.ARTICLE_NAME_MIN_LENGTH,
        "Article name",
    )
    await valid_length_exception(
        len(data.text),
        settings.ARTICLE_TEXT_MAX_LENGTH,
        settings.ARTICLE_TEXT_MIN_LENGTH,
        "Article text",
    )

    data = await prepare_article_data(data)
    data["user_id"] = user.id

    stmt = select(Publics).where(
        Publics.article_name == data["article_name"],
        Publics.book_name == data["book_name"],
        Publics.user_id == user.id,
    )
    if len((await session.execute(stmt)).mappings().fetchall()) > 0:
        raise ConflictException(detail="This article is already exist")

    subs_id = (
        (await session.execute(select(Subs.user_id).where(Subs.sub_id == user.id)))
        .scalars()
        .all()
    )
    filter_cond = User.id.in_(subs_id)
    stmt = select(User.email).where(filter_cond)
    emails = (await session.execute(stmt)).scalars().all()

    new_article = Publics(**data)
    session.add(new_article)
    await session.commit()

    tasks.add_task(
        email_prepare_data_send,
        user_name=user.username,
        to=emails,
    )
    return status.HTTP_201_CREATED


@router.post("/bookdiary/articles/new/{book_id}", status_code=status.HTTP_201_CREATED)
async def create_article_by_book_id(
    tasks: BackgroundTasks,
    user: User = Depends(current_user),
    data: dict = Depends(Create_Article_book_id_get),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за создание статьи по book_id
    """
    await valid_length_exception(
        len(data.article_name),
        settings.ARTICLE_NAME_MAX_LENGTH,
        settings.ARTICLE_NAME_MIN_LENGTH,
        "Article name",
    )
    await valid_length_exception(
        len(data.text),
        settings.ARTICLE_TEXT_MAX_LENGTH,
        settings.ARTICLE_TEXT_MIN_LENGTH,
        "Article text",
    )

    data = await prepare_article_data(data)
    data["user_id"] = user.id

    stmt = select(Publics).where(
        Publics.article_name == data["article_name"],
        Publics.book_name == data["book_name"],
        Publics.user_id == user.id,
    )
    if len((await session.execute(stmt)).mappings().fetchall()) > 0:
        raise ConflictException(detail="This article is already exist")

    subs_id = (
        (await session.execute(select(Subs.user_id).where(Subs.sub_id == user.id)))
        .scalars()
        .all()
    )
    filter_cond = User.id.in_(subs_id)
    stmt = select(User.email).where(filter_cond)
    emails = (await session.execute(stmt)).scalars().all()

    new_article = Publics(**data)
    session.add(new_article)
    await session.commit()

    tasks.add_task(
        email_prepare_data_send,
        user_name=user.username,
        to=emails,
    )
    return status.HTTP_201_CREATED


@router.get("/bookdiary/articles/my/{article_id}", response_model=Book_info)
async def get_article_info_for_edit(
    article_id: str,
    user: User = Depends(current_user),
    session: AsyncSession = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за получение данных статьи данного пользователя для редактирования
    """
    stmt_select = select(Publics).where(Publics.id == article_id)
    result = (await session.execute(stmt_select)).scalars().first()
    if not result:
        raise NotFoundException(detail="Article not found")
    if result.user_id != user.id:
        raise ConflictException(detail="It's not your article")

    return result


@router.put("/bookdiary/articles/my/{article_id}", status_code=status.HTTP_202_ACCEPTED)
async def edit_article_by_article_id(
    user: User = Depends(current_user),
    data: dict = Depends(Edit_Article_get),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за редактирование статьи
    """
    await valid_length_exception(
        len(data.article_name),
        settings.ARTICLE_NAME_MAX_LENGTH,
        settings.ARTICLE_NAME_MIN_LENGTH,
        "Article name",
    )

    await valid_length_exception(
        len(data.text),
        settings.ARTICLE_TEXT_MAX_LENGTH,
        settings.ARTICLE_TEXT_MIN_LENGTH,
        "Article text",
    )

    stmt_select = select(Publics).where(Publics.id == data.id)
    result = (await session.execute(stmt_select)).first()
    result = result[0].__dict__
    result.pop("_sa_instance_state")
    if result["book_name"] != data.book_name:
        result = await prepare_article_data(data)
    result["text"] = data.text
    stmt = select(Publics).where(
        Publics.article_name == data.article_name,
        Publics.book_name == result["book_name"],
        Publics.user_id == user.id,
    )
    if len((await session.execute(stmt)).mappings().fetchall()) > 0:
        raise ConflictException(detail="This article is already exist")
    result["article_name"] = data.article_name
    stmt_update = update(Publics).where(Publics.id == data.id).values(**result)
    await session.execute(stmt_update)
    await session.commit()

    return status.HTTP_202_ACCEPTED


@router.get("/bookdiary/articles/{article_id}", response_model=Article_Page_resp)
async def get_article_by_article_id(
    article_id: str,
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за окно статьи
    """
    stmt = select(Publics).where(Publics.id == article_id)
    try:
        res = (await session.execute(stmt)).first()
    except InvalidRequestError as exc:
        raise ServerException(detail=exc) from exc
    if not res:
        raise NotFoundException(detail="Article not found")
    result = res[0].__dict__
    stmt2 = select(Subs).where(
        Subs.user_id == user.id,
        Subs.sub_id == result["user_id"],
    )
    sub = (await session.execute(stmt2)).scalar_one_or_none()

    stmt3 = select(User.username).where(User.id == result["user_id"])
    user_name = (await session.execute(stmt3)).scalar_one_or_none()

    stmt4 = select(Likes).where(
        Likes.article_id == article_id, Likes.user_id == user.id
    )
    like = (await session.execute(stmt4)).scalar_one_or_none()

    stmt5 = select(Likes).where(Likes.article_id == article_id)
    likes = (await session.execute(stmt5)).scalars().all()

    return {
        "is_sub": int(sub is not None) + 2 * (user.id == result["user_id"]),
        "is_liked": int(like is not None) + 2 * (user.id == result["user_id"]),
        "likes": len(likes),
        "user_name": user_name,
    } | result


@router.delete(
    "/bookdiary/articles/my/{article_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_article_by_article_id(
    article_id: str,
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за удаление статьи по article_id
    """
    stmt = select(Publics).where(Publics.id == article_id)
    try:
        result = (await session.execute(stmt)).scalar_one_or_none()
    except InvalidRequestError as exc:
        raise ServerException(detail=exc) from exc
    if not result:
        raise NotFoundException(detail="Article not found")
    if result.user_id != user.id:
        raise ConflictException(detail="It's not your article")
    stmt2 = delete(Publics).where(Publics.id == article_id)
    await session.execute(stmt2)
    await session.commit()

    return status.HTTP_204_NO_CONTENT


@router.get("/bookdiary/users/{user_id}", response_model=Author_Page_resp)
async def get_all_user_article(
    user_id: uuid.UUID,
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за окно автора
    """
    stmt = Publics.__table__.select().where(Publics.user_id == user_id)
    result = (await session.execute(stmt)).mappings().fetchall()
    if not result:
        raise NotFoundException(detail="Articles not found")
    stmt2 = select(Subs).where(
        Subs.user_id == user.id,
        Subs.sub_id == user_id,
    )
    sub = (await session.execute(stmt2)).scalar_one_or_none()
    stmt3 = select(User).where(
        User.id == user_id,
    )
    user_name = (await session.execute(stmt3)).scalar_one_or_none()

    print(result)
    filter_cond = Likes.article_id.in_([elem.id for elem in result])
    stmt4 = select(Likes).where(filter_cond)
    likes = (await session.execute(stmt4)).scalars().all()

    return {
        "author_info": {
            "is_sub": int(sub is not None) + 2 * (user.id == user_id),
            "user_name": user_name.username,
            "articles_count": len(result),
        },
        "articles": [
            dict(result[i])
            | {"articles_count": len(result)}
            | {"likes": len([1 for j in likes if j.article_id == result[i].id])}
            for i in range(len(result))
        ],
    }


@router.get(
    "/bookdiary/articles/users/my",
    response_model=List[My_articles_resp],
)
async def get_all_this_user_article(
    user: User = Depends(current_user),
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за окно "Мои статьи"
    """
    stmt = Publics.__table__.select().where(Publics.user_id == user.id)
    result = (await session.execute(stmt)).mappings().fetchall()
    if not result:
        raise NotFoundException(detail="Articles not found")
    if result[0].user_id != user.id:
        raise ServerException(detail="Server error: not your user_id")

    return [
        dict(result[i]) | {"user_name": "name", "articles_count": len(result)}
        for i in range(len(result))
    ]


@router.get("/bookdiary/articles/search/{query}", response_model=List[Author_Page_2])
async def search_articles_by_book_name(
    query: str,
    session: AsyncSession() = Depends(get_async_session),
):
    """
    Эндпоинт, отвечающий за поиск статей на сайте по названию книги
    """
    books_id = await get_books_id_by_query(query)

    filter_cond = Publics.book_id.in_(books_id)
    stmt = select(Publics).where(filter_cond).order_by(desc(Publics.likes))
    result = (await session.execute(stmt)).scalars().all()
    if len(result) == 0:
        raise NotFoundException(detail="Nothing found by this query")
    stmt2 = select(Publics.user_id)
    result2 = (await session.execute(stmt2)).fetchall()
    articles_count = [result2.count((result[i].user_id,)) for i in range(len(result))]

    filter_cond2 = User.id.in_({i[0] for i in result2})
    stmt3 = select(User.id, User.username).where(filter_cond2)
    result3 = (await session.execute(stmt3)).mappings().fetchall()
    usernames = {result3[i].id: result3[i].username for i in range(len(result3))}

    filter_cond = Likes.article_id.in_([elem.id for elem in result])
    stmt4 = select(Likes).where(filter_cond)
    likes = (await session.execute(stmt4)).scalars().all()

    return [
        result[i].__dict__
        | {"articles_count": articles_count[i]}
        | {"user_name": usernames[result[i].user_id]}
        | {"likes": sum(j.article_id == result[i].id for j in likes)}
        for i in range(len(result))
    ]


@router.get("/bookdiary/", response_model=List[Author_Page_2])
async def get_popular_articles(session: AsyncSession() = Depends(get_async_session)):
    """
    Эндпоинт, отвечающий за главную страницу
    """
    stmt = select(Publics).order_by(desc(Publics.likes))
    result = (await session.execute(stmt)).scalars().all()
    if len(result) == 0:
        raise NotFoundException(detail="No articles on the site")
    stmt2 = select(Publics.user_id)
    result2 = (await session.execute(stmt2)).fetchall()
    articles_count = [result2.count((result[i].user_id,)) for i in range(len(result))]

    filter_cond2 = User.id.in_({i[0] for i in result2})
    stmt3 = select(User.id, User.username).where(filter_cond2)
    result3 = (await session.execute(stmt3)).mappings().fetchall()
    usernames = {result3[i].id: result3[i].username for i in range(len(result3))}

    filter_cond = Likes.article_id.in_([elem.id for elem in result])
    stmt4 = select(Likes).where(filter_cond)
    likes = (await session.execute(stmt4)).scalars().all()

    return [
        result[i].__dict__
        | {"articles_count": articles_count[i]}
        | {"user_name": usernames[result[i].user_id]}
        | {"likes": sum(j.article_id == result[i].id for j in likes)}
        for i in range(len(result))
    ]
