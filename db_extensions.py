"""
Скрипт создания расширеня uuid-ossp в базах данных
"""

import psycopg2

from src.config.project_config import settings


def install_uuid_extension(name, host, user, password):
    """
    Подключение к базе и создание в ней расширение
    """
    try:
        connection = psycopg2.connect(
            dbname=name, user=user, password=password, host=host
        )
        cursor = connection.cursor()

        cursor.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

        connection.commit()
        print(f"Расширение uuid-ossp установлено в базе данных {name}")
    except psycopg2.OperationalError as e:
        print(f"Ошибка подключения к базе данных {name}: {e}")
    except psycopg2.ProgrammingError as e:
        print(f"Ошибка при выполнении SQL-запроса в базе данных {name}: {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


if __name__ == "__main__":
    install_uuid_extension(
        settings.DB_NAME, settings.DB_HOST, settings.DB_USER, settings.DB_PASS
    )
    install_uuid_extension(
        settings.DB_NAME_TEST,
        settings.DB_HOST_TEST,
        settings.DB_USER_TEST,
        settings.DB_PASS_TEST,
    )
