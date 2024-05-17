from fastapi import APIRouter
from langchain_core.prompts import load_prompt

from langchain.schema import HumanMessage
from langchain.chat_models.gigachat import GigaChat

from src.config.project_config import settings


gigachat_router = APIRouter()
prompt_for_recommendation_books = load_prompt('src/api/recommendation_books.yaml')
prompt_for_recommendation_movies = load_prompt('src/api/recommendation_movies.yaml')
prompt_for_short_content = load_prompt('src/api/short_content.yaml')
chat = GigaChat(credentials=settings.GIGACHAT_API_KEY, verify_ssl_certs=False)


@gigachat_router.get("/short_content")
async def gigachat_short_content(query: str):
    try:
        text = prompt_for_short_content.format(titles=query)
        return chat([HumanMessage(content=text)])
    except Exception as e:
        raise e
