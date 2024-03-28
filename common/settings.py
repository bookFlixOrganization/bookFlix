from envparse import Env


env = Env()

DATABASE_URL = env.str(
    "DATABASE_URL",
    default="postgresql+psycopg://postgres:postgres@0.0.0.0:5432/postgres"
)
