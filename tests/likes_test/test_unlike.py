from src.bookdiary.models.models import Publics
from tests.conftest import async_session_maker, client

from fastapi import status

from sqlalchemy import select


article_id = ""
bad_article_id = "ffffffff-ffff-9999-ffff-ffffffffffff"


# prepare database to tests
async def test_create_article_for_test():
    global article_id

    data = {
        "user_id": 6,
        "book_name": "Журавлинный крик",
        "article_name": "Глечик3",
        "text": "Овсеев",
        "user_name": "name",
    }

    client.post("/bookdiary/articles/my", params=data)

    async with async_session_maker() as session:
        stmt = select(Publics).where(Publics.article_name == "Глечик3")
        result = (await session.execute(stmt)).scalar_one_or_none().__dict__
        article_id = result["id"]


async def test_create_likes_for_test():
    data = {
        "user_id": 9,
        "article_id": article_id,
    }

    client.post(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )


# Article not found. expect: status_code: 404
def test_article_not_found():
    data = {
        "user_id": 9,
        "article_id": bad_article_id,
    }
    response = client.delete(
        "/bookdiary/likes/{article_id}".format(
            article_id=bad_article_id,
        ),
        params=data,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


# Create unlike for yourself. expect: status_code: 404
def test_unlike_yourself():
    data = {
        "user_id": 6,
        "article_id": article_id,
    }
    response = client.delete(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


# Create unlike. expect: status_code: 200
def test_unlike():
    data = {
        "user_id": 9,
        "article_id": article_id,
    }
    response = client.delete(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )
    assert response.status_code == status.HTTP_200_OK
