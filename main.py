from fastapi import FastAPI, HTTPException
from src.api.app import create_app
import uvicorn
from src.config.db.session import global_init, create_session, Base
from src.models.users import User


def test_app():
    app_test = FastAPI(
        debug=True,
        title='Test'
    )
    return app_test


app = create_app()

User_1 = User()
User_1.name = "User1"
User_1.email = "<EMAIL>"
User_1.surname = "Nasme"

if __name__ == '__main__':
    global_init()
    db_sess = create_session()
    db_sess.add(User_1)
    db_sess.commit()
    print(db_sess.query(User).first().name)
    db_sess.close()
