#import uuid
#
#from fastapi import HTTPException
#from sqlalchemy.orm import Session
#
#from src.models.users import User
#from src.schemas.user import UserBase
#
#
#class UsersDAL:
#    def __init__(self, db: Session):
#        self.db = db
#
#    def create_user(self, user: UserBase):
#        db_user = User(name=user.name, surname=user.surname, email=user.email)
#        self.db.add(db_user)
#        try:
#            self.db.commit()
#            self.db.refresh(db_user)
#        except Exception as e:
#            self.db.rollback()
#            raise HTTPException(status_code=400, detail=str(e))
#        return db_user
#
#    def delete_user(self, user_id: uuid.UUID):
#        user = self.db.query(User).filter(User.user_id == user_id).first()
#        if not user:
#            raise HTTPException(status_code=404, detail="User not found")
#        self.db.delet#e(user)
#        self.db.commit()
#        return {"message": "User deleted successfully"}#
import uuid
#    def get_user(sel#f, user_id: uuid.UUID):
#        user = self.db.query(User).filter(User.user_id == user_id).first()
#        if not user:
#            raise HTTPException(status_code=404, detail="User not found")
#        return user#

#    def update_user(self, user_id: uuid.UUID, new_data_user: UserBase):
#        user = self.get_user(user_id)
#        if not user:
#            raise HTTPException(status_code=404, detail="User not found")
#        user.name = new_data_user.name
#        user.surname = new_data_user.surname
#        user.email = new_data_user.email
#        self.db.commit()
#        self.db.refresh(user)
#        return user

from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin, exceptions, models, schemas, UUIDIDMixin

from src.config.db.auth_session import User, get_user_db

from src.config.project_config import SECRET


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Optional[Request] = None,
    ) -> models.UP:
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = (
            user_create.create_update_dict()
            if safe
            else user_create.create_update_dict_superuser()
        )
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)
        user_dict["role_id"] = 1

        created_user = await self.user_db.create(user_dict)

        await self.on_after_register(created_user, request)

        return created_user


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
