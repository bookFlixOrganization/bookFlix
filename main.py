import uvicorn
from src.api.app import create_app
from src.api.book_handlers import book_router
from src.api.gigachat import gigachat_router
from src.api.user_handlers import user_router
from src.api.list_handlers import list_router
from src.api.movie_handlers import movie_router
from src.api.search_handlers import search_router

app = create_app()
app.include_router(user_router)
app.include_router(gigachat_router, tags=["gigachat"])
app.include_router(movie_router)
app.include_router(book_router)
app.include_router(list_router)
app.include_router(search_router)

if __name__ == '__main__':
    uvicorn.run("main:app", host="localhost", port=8000)
