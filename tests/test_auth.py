import pytest
from httpx import AsyncClient
from sqlalchemy import insert, select

from main import app
from src.models.users import role
from tests.conftest import client, async_session_maker, ac


async def test_add_role():
    async with async_session_maker() as session:
        statement = insert(role).values(id=1, name="user", permissions=None)
        await session.execute(statement)
        await session.commit()

        query = select(role)
        result = await session.execute(query)
        assert result.all() == [(1, 'user', None)], "Role not found"


def test_register():
    response = client.post("/auth/register", json={
        "email": "string@mail.com",
        "password": "string123",
        "is_active": True,
        "is_superuser": False,
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


# @pytest.mark.asyncio
# async def test_jwt_login():
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         # Form data for the request
#         form_data = {
#             "username": "string@mail.com",
#             "password": "string123"
#         }
#
#         # Send the request
#         response = await ac.post("/auth/jwt/login", data=form_data)
#
#         # Check the response
#         assert response.status_code == 200
#
#