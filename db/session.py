from common.settings import DATABASE_URL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


engine = create_engine(url=DATABASE_URL, echo=True)
new_session = sessionmaker(engine, expire_on_commit=False)