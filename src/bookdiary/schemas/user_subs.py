from pydantic import BaseModel


class UserSubs_operation(BaseModel):  # sub | unsub
    sub_id: int
    sub_name: str
    articles_count: int
