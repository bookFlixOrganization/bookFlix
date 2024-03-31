from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_config import DATABASE_URL

engine = create_engine(url=DATABASE_URL, echo=True)
new_session = sessionmaker(engine, expire_on_commit=False)