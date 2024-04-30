from fastapi import APIRouter
from langchain_core.prompts import load_prompt

from langchain.schema import HumanMessage
from langchain.chat_models.gigachat import GigaChat

from src.config.project_config import settings


gigachat_router = APIRouter()
prompt_for_recommendation = load_prompt('src/api/recommendation.yaml')
prompt_for_short_content = load_prompt('src/api/short_content.yaml')


@gigachat_router.get("/recommendation")
async def gigachat_recommendation(query: str):
    try:
        chat = GigaChat(credentials=settings.GIGACHAT_API_KEY, verify_ssl_certs=False)
        text = prompt_for_recommendation.format(titles=query)
        return chat([HumanMessage(content=text)])
    except Exception as e:
        raise e


@gigachat_router.get("/short_content")
async def gigachat_short_content(query: str):
    try:
        chat = GigaChat(credentials=settings.GIGACHAT_API_KEY, verify_ssl_certs=False)
        text = prompt_for_short_content.format(titles=query)
        return chat([HumanMessage(content=text)])
    except Exception as e:
        raise e
