from fastapi import FastAPI
from src.api.app import create_app
import uvicorn


def test_app():
    app_test = FastAPI(
        debug=True,
        docs_url='/api/docs',
        title='Test'
    )
    return app_test

app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=4000)