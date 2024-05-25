# pylint: disable=C0103


"""
Схемы для подписок
"""


from uuid import UUID

from pydantic import BaseModel


class UserSubs_operation(BaseModel):  # sub | unsub
    """
    Схема для операция над подписками
    """
    sub_id: UUID
    sub_name: str
    articles_count: int
