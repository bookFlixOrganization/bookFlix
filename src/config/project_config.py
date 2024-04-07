from dotenv import load_dotenv
import os

load_dotenv()

SECRET = os.environ.get("SECRET")
SECRET_VER = os.environ.get("SECRET_VER")
DB_HOST_TEST = os.environ.get("DB_HOST_TEST")
DB_PORT_TEST = os.environ.get("DB_PORT_TEST")
DB_NAME_TEST = os.environ.get("DB_NAME_TEST")
DB_USER_TEST = os.environ.get("DB_USER_TEST")
DB_PASS_TEST = os.environ.get("DB_PASS_TEST")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
TMDB_TOKEN = os.environ.get("TMDB_TOKEN")
GIGACHAT_API_KEY = os.environ.get("GIGACHAT_API_KEY")

