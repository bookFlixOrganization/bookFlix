from fastapi import FastAPI, HTTPException, APIRouter
from src.api.app import create_app
import uvicorn

from src.api.handlers import user_router
# from src.api.handlers import login
# from src.config.db.session import global_init, create_session, Base
from src.models.users import User


def test_app():
    app_test = FastAPI(
        debug=True,
        title='Test'
    )
    return app_test


app = create_app()

main_app_router = APIRouter()
main_app_router.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(user_router)


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
