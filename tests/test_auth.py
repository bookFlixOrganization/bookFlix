from sqlalchemy import insert, select
from conftest import client, async_session_maker
from src.models.users import Role


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


# @pytest.fixture
# async def authenticated_client(ac: AsyncClient):
#     form_data = {
#         "username": "string@mail.com",
#         "password": "string123"
#     }
#     response = await ac.post("/auth/jwt/login", data=form_data)
#     assert response.status_code == 204
#
#     # Установка куки для клиента
#     print(response.headers)
#     ac.headers = response.headers
#     ac.cookies = response.cookies
#
#     return ac
#
#
# async def test_user_info(authenticated_client: AsyncClient):
#     response = await authenticated_client.get("/users/me", cookies=authenticated_client.cookies)
#     print(authenticated_client.cookies)
#     assert response.status_code == 200
#     # Проверка ответа
#     ans = {
#         "email": "string@mail.com",
#         "is_active": True,
#         "is_superuser": True,
#         "is_verified": True,
#         "username": "string",
#         "role_id": 1
#     }
#     assert response.json() == ans