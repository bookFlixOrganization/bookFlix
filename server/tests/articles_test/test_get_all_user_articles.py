from tests.conftest import client

from fastapi import status


# prepare database to tests
async def test_create_article_for_test():
    data1 = {
        "user_id": 4,
        "book_name": "Кладбище домашних животных",
        "article_name": "Черч",
        "text": "Прикольный кот",
        "user_name": "name4",
    }
    data2 = {
        "user_id": 4,
        "book_name": "Кладбище домашних животных",
        "article_name": "Элли",
        "text": "Жалко девчонку",
        "user_name": "name4",
    }
    data3 = {
        "user_id": 5,
        "book_name": "Стивен Кинг Туман",
        "article_name": "Черч2",
        "text": "Прикольный кот",
        "user_name": "name4",
    }
    data4 = {
        "user_id": 5,
        "book_name": "Стивен Кинг Туман",
        "article_name": "Элли2",
        "text": "Жалко девчонку",
        "user_name": "name4",
    }
    data5 = {
        "user_id": 5,
        "book_name": "Стивен Кинг Туман",
        "article_name": "Черч3",
        "text": "Прикольный кот",
        "user_name": "name4",
    }
    data6 = {
        "user_id": 5,
        "book_name": "Судьба человека",
        "article_name": "Война",
        "text": "......",
        "user_name": "name4",
    }

    client.post("/bookdiary/articles/my", params=data1)
    client.post("/bookdiary/articles/my", params=data2)
    client.post("/bookdiary/articles/my", params=data3)
    client.post("/bookdiary/articles/my", params=data4)
    client.post("/bookdiary/articles/my", params=data5)
    client.post("/bookdiary/articles/my", params=data6)


# Not found any article. expect: status_code: 404
def test_not_found():
    data = {
        "user_id": 0,
    }

    response = client.get("/bookdiary/users/{user_id}".format(user_id=0), params=data)

    assert response.status_code == status.HTTP_404_NOT_FOUND


# All users articles. expect: status_code: 200
def test_all_users_articles():
    global article_id

    data1 = {
        "user_id": 4,
    }
    data2 = {
        "user_id": 5,
    }
    response1 = client.get("/bookdiary/users/{user_id}".format(user_id=4), params=data1)
    response2 = client.get("/bookdiary/users/{user_id}".format(user_id=5), params=data2)

    assert response1.status_code == status.HTTP_200_OK
    assert response2.status_code == status.HTTP_200_OK

    assert len(response1.json()["articles"]) == 2
    assert len(response2.json()["articles"]) == 4
