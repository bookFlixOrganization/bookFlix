import pytest
from httpx import AsyncClient
from sqlalchemy import insert, select
from src.models.users import Role
from tests.conftest import async_session_maker, client


async def test_add_role():
    async with async_session_maker() as session:
        statement = insert(Role.__table__).values(id=1, name="admin", permissions=None)
        await session.execute(statement)
        await session.commit()

        query = select(Role.__table__)
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
        "role_id": 1,
        "is_preferences": False
    })
    assert response.status_code == 201


def test_get_verify_token():
    response = client.post("/auth/request-verify-token", json={
        "email": "string@mail.com"
    })
    assert response.status_code == 202


async def test_au(ac: AsyncClient):
    form_data = {
        "username": "string@mail.com",
        "password": "string123"
    }
    response = await ac.post("/auth/jwt/login", data=form_data)
    assert response.status_code == 204

    for key, value in response.cookies.items():
        ac.cookies.set(key, value)


async def test_user(ac: AsyncClient):
    res = await ac.get("/users/me")
    assert res.status_code == 200
