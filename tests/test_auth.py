from httpx import AsyncClient
from sqlalchemy import insert, select
from conftest import client, async_session_maker
from src.models.users import role


async def test_add_role():
    async with async_session_maker() as session:
        statement = insert(role).values(id=1, name="admin", permissions=None)
        await session.execute(statement)
        await session.commit()

        query = select(role)
        result = await session.execute(query)
        assert result.all() == [(1, 'admin', None)], "Role not found"


def test_register():
    response = client.post("/auth/register", json={
        "email": "string@mail.com",
        "password": "string123",
        "is_active": True,
        "is_superuser": True,
        "is_verified": True,
        "username": "string",
        "role_id": 1
    })
    assert response.status_code == 201


def test_get_verify_token():
    response = client.post("/auth/request-verify-token", json={
        "email": "string@mail.com"
    })
    assert response.status_code == 202


async def test_jwt_login(ac: AsyncClient):
    form_data = {
        "username": "string@mail.com",
        "password": "string123"
    }
    response1 = await ac.post("/auth/jwt/login", data=form_data)
    assert response1.status_code == 204
    # response2 = await ac.get("/users/me")
    # ans = {
    #     "email": "string@mail.com",
    #     "password": "string123",
    #     "is_active": True,
    #     "is_superuser": True,
    #     "is_verified": True,
    #     "username": "string",
    #     "role_id": 1
    # }
    # assert response2 == 200
