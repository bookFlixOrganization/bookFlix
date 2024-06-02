from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def create_app():
    """
    Эта функция создает приложение FastAPI с настроенным промежуточным программным обеспечением CORS.

    Returns:
    FastAPI: Экземпляр приложения FastAPI с промежуточным программным обеспечением CORS.
    """
    app = FastAPI(
        docs_url='/',
        title='bookFlix'
    )

    origins = [
        "http://localhost:3000"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
