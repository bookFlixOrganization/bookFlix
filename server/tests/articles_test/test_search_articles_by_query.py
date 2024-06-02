from tests.conftest import client

from fastapi import status


# prepare database to tests
async def test_create_article_for_test():
    data1 = {
        "user_id": 6,
        "book_name": "Хоббит, или Туда и Обратно",
        "article_name": ".....",
        "text": ".....",
        "user_name": "name4",
    }
    data2 = {
        "user_id": 7,
        "book_name": "Хоббит. Путешествие по книге",
        "article_name": ".....",
        "text": ".....",
        "user_name": "name4",
    }
    data3 = {
        "user_id": 7,
        "book_name": "Хоббит",
        "article_name": "Черч2",
        "text": "Прикольный кот",
        "user_name": "name4",
    }
    data4 = {
        "user_id": 8,
        "book_name": "Утренний хоббит",
        "article_name": "Элли2",
        "text": "Жалко девчонку",
        "user_name": "name4",
    }

    client.post("/bookdiary/articles/my", params=data1)
    client.post("/bookdiary/articles/my", params=data2)
    client.post("/bookdiary/articles/my", params=data3)
    client.post("/bookdiary/articles/my", params=data4)


# Not found any article by query. expect: status_code: 404
def test_nothing_found():
    data = {
        "query": "Повелитель мух",
    }

    response = client.get(
        "/bookdiary/articles/search/{query}".format(query="Повелитель мух"),
        params=data,
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND


# All articles by query. expect: status_code: 200
def test_all_articles_by_query():
    global article_id

    data = {
        "query": "Хоббит",
    }
    response = client.get(
        "/bookdiary/articles/search/{query}".format(query="Хоббит"),
        params=data,
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.json()) == 4
