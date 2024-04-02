from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

__factory = None

def global_init():
    global __factory

    if __factory:
        return

    engine = create_engine('postgresql://postgres:postgres@localhost:5432/testdb', echo=True)

    __factory = sessionmaker(bind=engine)


    from src.models import __all_models

    Base.metadata.create_all(engine)

def create_session() -> Session:
    global __factory
    return __factory()
