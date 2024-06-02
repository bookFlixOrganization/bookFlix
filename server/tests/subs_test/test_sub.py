from tests.conftest import client

from fastapi import status


# Create sub for yourself. expect: status_code: 400
def test_create_yourself_sub():
    data = {
        "user_id": 1,
        "sub_id": 1,
        "sub_name": "name",
    }
    response = client.post("/bookdiary/subs/{sub_id}".format(sub_id=1), params=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST


# Create sub. expect: status_code: 200
def test_create_sub():
    data = {
        "user_id": 1,
        "sub_id": 2,
        "sub_name": "name",
    }
    response = client.post("/bookdiary/subs/{sub_id}".format(sub_id=2), params=data)
    assert response.status_code == status.HTTP_200_OK


# Create same sub. expect: status_code: 409
def test_create_same_sub():
    data = {
        "user_id": 1,
        "sub_id": 2,
        "sub_name": "name",
    }
    response = client.post("/bookdiary/subs/{sub_id}".format(sub_id=2), params=data)
    assert response.status_code == status.HTTP_409_CONFLICT
