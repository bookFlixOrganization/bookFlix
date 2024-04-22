import uvicorn
from fastapi import FastAPI
from src.api.app import create_app
from src.api.gigachat import gigachat_router
from src.api.handlers import user_router


def test_app():
    app_test = FastAPI(
        debug=True,
        title='Test'
    )
    return app_test


app = create_app()
app.include_router(user_router)
app.include_router(gigachat_router, tags=["gigachat"])

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000)
