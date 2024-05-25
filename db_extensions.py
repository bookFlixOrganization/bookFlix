"""
Скрипт создания расширеня uuid-ossp в базах данных
"""

import asyncio
import asyncpg

from src.config.project_config import settings


async def install_uuid_extension(pool, dbname):
    """
    Создание расширения в переданной базе данных
    """
    async with pool.acquire() as connection:
        try:
            await connection.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
            print(f"Расширение uuid-ossp установлено в базе данных {dbname}")
        except asyncpg.PostgresError as e:
            print(f"Ошибка при установке расширения в базе данных {dbname}: {e}")


async def main():
    """
    Создание подключений к базам данных
    """
    conn_params_db = {
        "host": settings.DB_HOST,
        "user": settings.DB_USER,
        "password": settings.DB_PASS,
        "database": settings.DB_NAME,
    }

    conn_params_testdb = {
        "host": settings.DB_HOST_TEST,
        "user": settings.DB_USER_TEST,
        "password": settings.DB_PASS_TEST,
        "database": settings.DB_NAME_TEST,
    }

    pool_db = await asyncpg.create_pool(**conn_params_db)
    pool_testdb = await asyncpg.create_pool(**conn_params_testdb)

    await install_uuid_extension(pool_db, conn_params_db["database"])
    await install_uuid_extension(pool_testdb, conn_params_testdb["database"])

    await pool_db.close()
    await pool_testdb.close()


if __name__ == "__main__":
    asyncio.run(main())
