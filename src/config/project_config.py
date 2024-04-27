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
    TNY_API_KET: str

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()
