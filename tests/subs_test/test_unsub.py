from tests.conftest import client

from fastapi import status


# prepare database to tests
async def test_create_sub_for_test():
    global article_id

    data = {
        "user_id": 3,
        "sub_id": 4,
        "sub_name": "name",
    }

    client.post("/bookdiary/subs/{sub_id}".format(sub_id=4), params=data)


# Create unsub for yourself. expect: status_code: 400
def test_unsub_yourself():
    data = {
        "user_id": 3,
        "sub_id": 3,
        "sub_name": "name",
    }
    response = client.delete("/bookdiary/subs/{sub_id}".format(sub_id=3), params=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Create unsub. expect: status_code: 200
def test_unsub():
    data = {
        "user_id": 3,
        "sub_id": 4,
    }
    response = client.delete("/bookdiary/subs/{sub_id}".format(sub_id=4), params=data)
    assert response.status_code == status.HTTP_200_OK


# Not found a sub to unsub. expect: status_code: 404
def test_sub_not_found():
    data = {
        "user_id": 3,
        "sub_id": 5,
    }
    response = client.delete("/bookdiary/subs/{sub_id}".format(sub_id=5), params=data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
