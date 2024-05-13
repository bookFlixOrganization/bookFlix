from pydantic_settings import BaseSettings


class Settings(BaseSettings):
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
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()
