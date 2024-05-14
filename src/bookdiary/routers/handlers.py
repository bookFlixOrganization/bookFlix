
from typing import List


from src.bookdiary.models.models import Publics, Subs
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
    Edit_Article_get,
    My_articles_resp,
)

from fastapi import APIRouter
from fastapi import BackgroundTasks
from fastapi import Depends
from fastapi import status

from sqlalchemy import delete, desc, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.config.db.session import get_async_session
from src.config.project_config import settings


router = APIRouter(
    tags=["Article"],
)


def get_current_user_id(user_id: int):
    return user_id


def get_current_user_name(user_name: str):
    return user_name


def user_info(user_id: int, user_name: str):
    return {
        "user_id": get_current_user_id(user_id),
        "user_name": get_current_user_name(user_name),
    }


async def get_books_id_by_query(query: str):
    books_data = search_books(query)["items"]
    booksname = [book["id"] for book in books_data]
    return booksname


async def valid_length_exception(this: int, maximum: int, minimum: int, detail: str):
    if maximum < this or this < minimum:
        raise (
            LenghtException(
                detail=f"{detail} must be between {minimum} and {maximum} characters long",
            )
        )


@router.post("/bookdiary/articles/my", status_code=status.HTTP_200_OK)
async def create_article(
    tasks: BackgroundTasks,
    data: dict = Depends(Create_Article_get),
    session: AsyncSession() = Depends(get_async_session),
):
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

    user_id = get_current_user_id(data.user_id)
    # user_name = get_current_user_name(data.user_name)
    data = await prepare_article_data(data)

    async with session.begin():
        stmt = select(Publics).where(
            Publics.article_name == data["article_name"],
            Publics.book_name == data["book_name"],
            Publics.user_id == user_id,
        )
        if len((await session.execute(stmt)).mappings().fetchall()) > 0:
            raise ConflictException(detail="This article is already exist")
        # subs_id = (await session.execute(select(Subs.user_id).where(Subs.sub_id == user_id))).scalars().all()

        new_article = Publics(**data)
        session.add(new_article)
        await session.commit()
    
    # tasks.add_task(
        # email_prepare_data_send, user_id=user_id, user_name=user_name, result=subs_id,
    # )

    return status.HTTP_200_OK


@router.get("/bookdiary/articles/my/{article_id}", response_model=Book_info)
async def get_article_info_for_edit(
    article_id: str,
    session: AsyncSession = Depends(get_async_session),
):
    stmt_select = select(Publics).where(Publics.id == article_id)
    result = (await session.execute(stmt_select)).scalars().first()
    user_id = get_current_user_id(result.user_id)
    if not result:
        raise NotFoundException(detail="Article not found")
    if result.user_id != user_id:
        raise ConflictException(detail="It's not your article")

    return result


@router.put("/bookdiary/articles/my/{article_id}", status_code=status.HTTP_200_OK)
async def edit_article_by_article_id(
    user_id: int,
    data: dict = Depends(Edit_Article_get),
    session: AsyncSession() = Depends(get_async_session),
):
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

    user_id = get_current_user_id(user_id)
    async with session.begin():
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
            Publics.user_id == user_id,
        )

        if len((await session.execute(stmt)).mappings().fetchall()) > 0:
            raise ConflictException(detail="This article is already exist")

        result["article_name"] = data.article_name

        stmt_update = update(Publics).where(Publics.id == data.id).values(**result)
        await session.execute(stmt_update)
        await session.commit()
    return status.HTTP_200_OK


@router.get("/bookdiary/articles/{article_id}", response_model=Article_Page_resp)
async def get_article_by_article_id(
    article_id: str,
    session: AsyncSession() = Depends(get_async_session),
):
    async with session.begin():
        stmt = select(Publics).where(Publics.id == article_id)
        try:
            res = (await session.execute(stmt)).first()
        except Exception:
            raise ServerException(detail="Invalid uuid")
        if not res:
            raise NotFoundException(detail="Article not found")
        result = res[0].__dict__
        stmt2 = select(Subs).where(
            Subs.user_id == get_current_user_id(1),
            Subs.sub_id == result["user_id"],
        )
        sub = (await session.execute(stmt2)).scalar_one_or_none()
        result["user_name"] = user_info(1, "name")["user_name"]
    return {
        "is_sub": int(sub is not None)
        + 2 * (get_current_user_id(1) == result["user_id"]),
    } | result


@router.delete("/bookdiary/articles/my/{article_id}", status_code=status.HTTP_200_OK)
async def delete_article_by_article_id(
    article_id: str,
    session: AsyncSession() = Depends(get_async_session),
):
    async with session.begin():
        stmt = select(Publics).where(Publics.id == article_id)
        try:
            result = (await session.execute(stmt)).scalar_one_or_none()
        except Exception:
            raise ServerException(detail="Invalid uuid")

        if not result:
            raise (NotFoundException(detail="Article not found"))
        # if result.user_id != get_current_user_id():
        #     raise ConflictException(detail="It's not your article")

        stmt2 = delete(Publics).where(Publics.id == article_id)
        await session.execute(stmt2)
    return status.HTTP_200_OK


@router.get("/bookdiary/users/{user_id}", response_model=Author_Page_resp)
async def get_all_user_article(
    user_id: int,
    session: AsyncSession() = Depends(get_async_session),
):
    user = user_info(user_id, "name")
    async with session.begin():
        stmt = Publics.__table__.select().where(Publics.user_id == user["user_id"])
        result = (await session.execute(stmt)).mappings().fetchall()
        if not result:
            raise (NotFoundException(detail="Articles not found"))

        stmt2 = select(Subs).where(
            Subs.user_id == get_current_user_id(1),
            Subs.sub_id == user_id,
        )
        sub = (await session.execute(stmt2)).scalar_one_or_none()
    return {
        "author_info": {
            "is_sub": int(sub is not None) + 2 * (get_current_user_id(1) == user_id),
            "user_name": result[0].user_name,
            "articles_count": len(result),
        },
        "articles": [
            dict(result[i]) | {"articles_count": len(result)}
            for i in range(len(result))
        ],
    }


@router.get(
    "/bookdiary/articles/users/my/{user_id}",
    response_model=List[My_articles_resp],
)
async def get_all_this_user_article(
    user_id: int,
    session: AsyncSession() = Depends(get_async_session),
):
    user = user_info(user_id, "name")
    async with session.begin():
        stmt = Publics.__table__.select().where(Publics.user_id == user["user_id"])
        result = (await session.execute(stmt)).mappings().fetchall()
        if not result:
            raise (NotFoundException(detail="Articles not found"))
        if result[0].user_id != user_id:
            raise (ServerException(detail="Server error: not your user_id"))
    return [
        dict(result[i]) | {"user_name": "name", "articles_count": len(result)}
        for i in range(len(result))
    ]


@router.get("/bookdiary/articles/search/{query}", response_model=List[Author_Page_2])
async def search_articles_by_book_name(
    query: str,
    session: AsyncSession() = Depends(get_async_session),
):
    books_id = await get_books_id_by_query(query)
    async with session.begin():
        filter_cond = Publics.book_id.in_(books_id)
        stmt = select(Publics).where(filter_cond)
        result = (await session.execute(stmt)).scalars().all()

        if len(result) == 0:
            raise NotFoundException(detail="Nothing found by this query")

        stmt2 = select(Publics.user_id)
        result2 = (await session.execute(stmt2)).fetchall()
        articles_count = [
            result2.count((result[i].user_id,)) for i in range(len(result))
        ]

    return [
        result[i].__dict__ | {"articles_count": articles_count[i]}
        for i in range(len(result))
    ]


@router.get("/bookdiary/", response_model=List[Author_Page_2])
async def get_popular_articles(session: AsyncSession() = Depends(get_async_session)):
    async with session.begin():
        stmt = select(Publics).order_by(desc(Publics.likes))
        result = (await session.execute(stmt)).scalars().all()

        if len(result) == 0:
            raise NotFoundException(detail="No articles on the site")

        stmt2 = select(Publics.user_id)
        result2 = (await session.execute(stmt2)).fetchall()
        articles_count = [
            result2.count((result[i].user_id,)) for i in range(len(result))
        ]

    return [
        result[i].__dict__ | {"articles_count": articles_count[i]}
        for i in range(len(result))
    ]
