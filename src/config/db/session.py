from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from src.config.db.db_config import DATABASE_URL

Base = declarative_base()

# __factory = None


# def global_init():
#     global __factory
#
#     if __factory:
#         return
#
#     engine = create_engine(DATABASE_URL, echo=True)
#
#     __factory = sessionmaker(bind=engine)
#
#
#     from src.models import __all_models
#
#     Base.metadata.create_all(engine)
#
#
# def create_session() -> Session:
#     global __factory
#     return __factory()
#
#
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    Base.metadata.create_all(engine)
    try:
        yield db
    finally:
        db.close()