from tests.conftest import async_session_maker, client

from fastapi import status

from sqlalchemy import select

from src.bookdiary.models.models import Publics

article_id = ""
bad_article_id = "ffffffff-ffff-9999-ffff-ffffffffffff"


# prepare database to tests
async def test_create_article_for_test():
    global article_id

    data = {
        "user_id": 5,
        "book_name": "Журавлинный крик",
        "article_name": "Глечик2",
        "text": "Овсеев",
        "user_name": "name",
    }

    client.post("/bookdiary/articles/my", params=data)

    async with async_session_maker() as session:
        stmt = select(Publics).where(Publics.article_name == "Глечик2")
        result = (await session.execute(stmt)).scalar_one_or_none().__dict__
        article_id = result["id"]


# Create like for yourself. expect: status_code: 403
def test_create_like_yourself():
    data = {
        "user_id": 5,
        "article_id": article_id,
    }
    response = client.post(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


# Create like. expect: status_code: 200
def test_create_like():
    data = {
        "user_id": 6,
        "article_id": article_id,
    }
    response = client.post(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )
    assert response.status_code == status.HTTP_200_OK


# Create the same like. expect: status_code: 409
def test_create_same_like():
    data = {
        "user_id": 6,
        "article_id": article_id,
    }
    response = client.post(
        "/bookdiary/likes/{article_id}".format(article_id=article_id),
        params=data,
    )
    assert response.status_code == status.HTTP_409_CONFLICT


# Article not found. expect: status_code: 404
def test_article_not_fount():
    data = {
        "user_id": 8,
        "article_id": bad_article_id,
    }
    response = client.post(
        "/bookdiary/likes/{article_id}".format(
            article_id=bad_article_id,
        ),
        params=data,
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
