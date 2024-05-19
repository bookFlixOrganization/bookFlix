from pydantic import BaseModel
from uuid import UUID


class UserSubs_operation(BaseModel):  # sub | unsub
    sub_id: UUID
    sub_name: str
    articles_count: int
