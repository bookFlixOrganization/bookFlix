from fastapi import APIRouter
from langchain_core.prompts import load_prompt

from src.api.handlers import user_router
from langchain.schema import HumanMessage, SystemMessage
from langchain.chat_models.gigachat import GigaChat

from src.config.project_config import GIGACHAT_API_KEY


gigachat_router = APIRouter()


@gigachat_router.get("/gigachat")
async def gigachat_request(query: str):
    try:
        chat = GigaChat(credentials=GIGACHAT_API_KEY, verify_ssl_certs=False)
        prompt = load_prompt('src/api/prompt.yaml')
        text = prompt.format(titles=query)
        return chat([HumanMessage(content=text)])
    except Exception as e:
        raise e

