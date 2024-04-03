# from fastapi import FastAPI, HTTPException, APIRouter
# from src.api.app import create_app
import uuid

import uvicorn

# from src.api.handlers import user_router
# from src.api.handlers import login
# from src.config.db.session import global_init, create_session, Base
# from src.models.users import User

from datetime import datetime
from enum import Enum
from typing import List, Optional, Union

from fastapi_users import fastapi_users, FastAPIUsers
from pydantic import BaseModel, Field

from fastapi import FastAPI, Request, status, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from src.api.app import create_app
from src.api.auth import auth_backend
from src.config.db.auth_session import User
from src.models.dals import get_user_manager
from src.schemas.auth_schemas import UserRead, UserCreate


def test_app():
    app_test = FastAPI(
        debug=True,
        title='Test'
    )
    return app_test


app = create_app()

# main_app_router = APIRouter()
# main_app_router.include_router(user_router, prefix="/user", tags=["user"])
# app.include_router(user_router)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

current_user = fastapi_users.current_user()


@app.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.username}"


@app.get("/unprotected-route")
def unprotected_route():
    return f"Hello, anonym"


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
