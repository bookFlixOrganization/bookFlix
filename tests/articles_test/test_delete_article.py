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
        "user_id": 3,
        "book_name": "Тарас бульба",
        "article_name": "Тарас",
        "text": "Бульба",
        "user_name": "name3",
    }

    client.post("/bookdiary/articles/my", params=data)

    async with async_session_maker() as session:
        stmt = select(Publics).where(Publics.article_name == "Тарас")
        result = (await session.execute(stmt)).scalar_one_or_none().__dict__
        article_id = result["id"]


# Invalid uuid. expect: status_code: 500
def test_invalid_uuid():
    global article_id

    data = {
        "id": f"{article_id}d",
    }
    response = client.delete(
        "/bookdiary/articles/my/{article_id}".format(article_id=f"{article_id}d"),
        params=data,
    )

    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR


# Article not found. expect: status_code: 404
def test_article_not_found():
    global article_id

    data = {
        "id": bad_article_id,
    }
    response = client.delete(
        "/bookdiary/articles/my/{article_id}".format(
            article_id=bad_article_id,
        ),
        params=data,
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND


# Delete. expect: status_code: 200
def test_article_page():
    global article_id

    data = {
        "id": article_id,
    }
    response = client.delete(
        "/bookdiary/articles/my/{article_id}".format(article_id=article_id),
        params=data,
    )

    assert response.status_code == status.HTTP_200_OK
