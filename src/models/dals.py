import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.models.users import User
from src.schemas.user import UserBase


class UsersDAL:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserBase):
        db_user = User(name=user.name, surname=user.surname, email=user.email)
        self.db.add(db_user)
        try:
            self.db.commit()
            self.db.refresh(db_user)
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=400, detail=str(e))
        return db_user

    def delete_user(self, user_id: uuid.UUID):
        user = self.db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        self.db.delete(user)
        self.db.commit()
        return {"message": "User deleted successfully"}

    def get_user(self, user_id: uuid.UUID):
        user = self.db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def update_user(self, user_id: uuid.UUID, new_data_user: UserBase):
        user = self.get_user(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.name = new_data_user.name
        user.surname = new_data_user.surname
        user.email = new_data_user.email
        self.db.commit()
        self.db.refresh(user)
        return user
