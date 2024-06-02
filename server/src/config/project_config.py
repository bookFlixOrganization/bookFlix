from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Класс для хранения всех настроек приложения.

    Attributes:
    DB_HOST: Хост базы данных.
    DB_PORT: Порт базы данных.
    DB_NAME: Имя базы данных.
    DB_USER: Имя пользователя для базы данных.
    DB_PASS: Пароль для базы данных.
    SECRET: Секретный ключ для JWT токенов.
    SECRET_VER: Секретный ключ для верификации.
    TMDB_TOKEN: Токен для доступа к API TMDB.
    DB_HOST_TEST: Хост тестовой базы данных.
    DB_PORT_TEST: Порт тестовой базы данных.
    DB_NAME_TEST: Имя тестовой базы данных.
    DB_USER_TEST: Имя пользователя для тестовой базы данных.
    DB_PASS_TEST: Пароль для тестовой базы данных.
    GOOGLE_API_KEY: Ключ API для сервисов Google.
    GIGACHAT_API_KEY: Ключ API для сервиса Gigachat.
    TNY_API_KEY: Ключ API для сервиса TNY.
    MAIL_HOST: Хост для отправки электронных писем.
    MAIL_USERNAME: Имя пользователя для учетной записи электронной почты.
    MAIL_PASS: Пароль для учетной записи электронной почты.
    MAIL_PORT: Порт для отправки электронной почты.
    ARTICLE_TEXT_MAX_LENGTH: Максимальная длина текста статьи.
    ARTICLE_TEXT_MIN_LENGTH: Минимальная длина текста статьи.
    ARTICLE_NAME_MAX_LENGTH: Максимальная длина названия статьи.
    ARTICLE_NAME_MIN_LENGTH: Минимальная длина названия статьи.

    Methods:
    None

    """

    DB_HOST: str
    DB_PORT: str
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    SECRET: str
    SECRET_VER: str
    TMDB_TOKEN: str
    DB_HOST_TEST: str
    DB_PORT_TEST: str
    DB_NAME_TEST: str
    DB_USER_TEST: str
    DB_PASS_TEST: str
    GOOGLE_API_KEY: str
    GIGACHAT_API_KEY: str
    TNY_API_KEY: str
    MAIL_HOST: str
    MAIL_USERNAME: str
    MAIL_PASS: str
    MAIL_PORT: str
    ARTICLE_TEXT_MAX_LENGTH: int
    ARTICLE_TEXT_MIN_LENGTH: int
    ARTICLE_NAME_MAX_LENGTH: int
    ARTICLE_NAME_MIN_LENGTH: int

    class Config:
        """
        Параметры конфигурации приложения.

        Attributes:
        env_file: Имя файла, содержащего переменные среды.
        env_file_encoding: Кодировка файла среды.

        Methods:
        None

        """

        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()
