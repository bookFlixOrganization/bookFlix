import uuid

from fastapi import HTTPException, APIRouter, Depends

# from src.config.db.session import global_init, create_session
from src.config.db.session import get_db
from src.models.dals import UsersDAL
from src.models.users import User
from src.schemas.user import UserBase
from sqlalchemy.orm import Session
user_router = APIRouter()


@user_router.post("/user/")
def create_user(user: UserBase, db: Session = Depends(get_db)):
    users = UsersDAL(db)
    users.create_user(user)
    return {"message": "User created successfully"}


@user_router.delete("/user/")
def delete_user(user_id: uuid.UUID, db: Session = Depends(get_db)):
    users = UsersDAL(db)
    return users.delete_user(user_id)


@user_router.get("/user/{user_id}")
def get_user(user_id: uuid.UUID, db: Session = Depends(get_db)):
    users = UsersDAL(db)
    return users.get_user(user_id)


@user_router.put("/user/")
def update_user(user_id: uuid.UUID, user: UserBase, db: Session = Depends(get_db)):
    users = UsersDAL(db)
    return users.update_user(user_id, user)
