from tests.conftest import async_session_maker, client

from fastapi import status

from sqlalchemy import select

from src.bookdiary.models.models import Publics

article_id = ""


# prepare database to tests
async def test_create_article_for_test():
    global article_id

    data1 = {
        "user_id": 1,
        "book_name": "Мастер и Маргарита",
        "article_name": "Мастер",
        "text": "Маргарита",
        "user_name": "name",
    }

    data2 = {
        "user_id": 1,
        "book_name": "Мастер и Маргарита",
        "article_name": "Мастер и Маргарита",
        "text": "Маргарита",
        "user_name": "name",
    }

    data3 = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Философский камень",
        "article_name": "Гарри",
        "text": "Поттер",
        "user_name": "name",
    }

    client.post("/bookdiary/articles/my", params=data1)
    client.post("/bookdiary/articles/my", params=data2)
    client.post("/bookdiary/articles/my", params=data3)

    async with async_session_maker() as session:
        stmt = select(Publics).where(Publics.article_name == "Мастер")
        result = (await session.execute(stmt)).scalar_one_or_none().__dict__
        article_id = result["id"]


# Edit article with aticle_name length exception. expect: status_code: 400
def test_edit_article_name_lengthex():
    global article_id

    data = {
        "user_id": 1,
        "book_name": "Мастер и Маргарита",
        "article_name": ".",
        "text": "Маргарита",
        "id": article_id,
    }
    response = client.put(
        "/bookdiary/articles/my/{article_id}".format(article_id=article_id),
        params=data,
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Edit article with text length exception. expect: status_code: 400
def test_edit_text_lengthex():
    global article_id

    data = {
        "user_id": 1,
        "book_name": "Мастер и Маргарита",
        "article_name": "Мастер",
        "text": ".",
        "id": article_id,
    }
    response = client.put(
        "/bookdiary/articles/my/{article_id}".format(article_id=article_id),
        params=data,
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Edit article with book_nam+aticle_name which is already published. expect: status_code: 409
def test_edit_same_article():
    global article_id

    data = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Философский камень",
        "article_name": "Гарри",
        "text": "Поттер",
        "id": article_id,
    }
    response = client.put(
        "/bookdiary/articles/my/{article_id}".format(article_id=article_id),
        params=data,
    )

    assert response.status_code == status.HTTP_409_CONFLICT


# Edit article. expect: status_code: 200
def test_edit():
    global article_id

    data = {
        "user_id": 1,
        "book_name": "Мастер и Маргарита",
        "article_name": "Мастер2",
        "text": "Маргарита2",
        "id": article_id,
    }
    response = client.put(
        "/bookdiary/articles/my/{article_id}".format(article_id=article_id),
        params=data,
    )

    assert response.status_code == status.HTTP_200_OK
