from fastapi import FastAPI


def create_app():
    app = FastAPI(
        debug=True,
        docs_url='/api/docs',
        title='Test'
    )

    return app


def run_server(app=FastAPI(
    debug=True,
    docs_url='/api/docs',
    title='Test'
)):
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
