from tests.conftest import client

from fastapi import status


# Create article with aticle_name length exception. expect: status_code: 400
def test_create_article_lengthex():
    data = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Дары Смерти",
        "article_name": ".",
        "text": "Поттер",
        "user_name": "name",
    }
    response = client.post("/bookdiary/articles/my", params=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Create article with text length exception. expect: status_code: 400
def test_create_text_lenghtex():
    data = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Дары Смерти",
        "article_name": "Гарри",
        "text": ".",
        "user_name": "name",
    }
    response = client.post("/bookdiary/articles/my", params=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Create article. expect: status_code: 200
def test_create_article():
    data = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Дары Смерти",
        "article_name": "Гарри",
        "text": "Поттер",
        "user_name": "name",
    }
    response = client.post("/bookdiary/articles/my", params=data)
    assert response.status_code == status.HTTP_200_OK


# Create the same article. expect: status_code: 409
def test_create_same_article():
    data = {
        "user_id": 1,
        "book_name": "Гарри Поттер и Дары Смерти",
        "article_name": "Гарри",
        "text": "Поттер",
        "user_name": "name",
    }
    response = client.post("/bookdiary/articles/my", params=data)
    assert response.status_code == status.HTTP_409_CONFLICT


# Create article with not found book exception. expect: status_code: 404
def test_create_article_invalid_book_name():
    data = {
        "user_id": 1,
        "book_name": "lkgnogndoibnd;bi",
        "article_name": "Гарри",
        "text": "Поттер",
        "user_name": "name",
    }
    response = client.post("/bookdiary/articles/my", params=data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
