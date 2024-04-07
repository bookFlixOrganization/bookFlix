from sqlalchemy import insert, select

from src.models.users import role
from tests.conftest import client, async_session_maker


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
        "email": "string",
        "password": "string",
        "is_active": True,
        "is_superuser": False,
        "is_verified": False,
        "username": "string",
        "role_id": 1
    })
    assert response.status_code == 201

