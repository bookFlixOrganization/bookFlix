from fastapi import FastAPI


def create_app():
    app = FastAPI(
        docs_url='/',
        title='Test'
    )

    return app
