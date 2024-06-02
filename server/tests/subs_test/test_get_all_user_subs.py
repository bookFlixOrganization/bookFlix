from tests.conftest import client

from fastapi import status


async def test_create_sub_for_test():
    global article_id

    data1 = {
        "user_id": 4,
        "sub_id": 5,
        "sub_name": "name",
    }
    data2 = {
        "user_id": 4,
        "sub_id": 6,
        "sub_name": "name",
    }
    data3 = {
        "user_id": 4,
        "sub_id": 7,
        "sub_name": "name",
    }

    client.post("/bookdiary/subs/{sub_id}".format(sub_id=5), params=data1)
    client.post("/bookdiary/subs/{sub_id}".format(sub_id=6), params=data2)
    client.post("/bookdiary/subs/{sub_id}".format(sub_id=7), params=data3)


# All user subs. expect: status_code: 200
def test_unsub():
    data = {
        "user_id": 4,
    }
    response = client.get("/bookdiary/subs/my/{user_id}".format(user_id=4), params=data)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 3


# Not found in user subs. expect: status_code: 404
def test_sub_not_found():
    data = {
        "user_id": 5,
    }
    response = client.get("/bookdiary/subs/my/{user_id}".format(user_id=5), params=data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
