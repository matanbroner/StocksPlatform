import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# init in init_db_connection
engine = None
Session = None


def generate_db_uri(
    driver: str = "postgres",
    user: str = None,
    password: str = None,
    host: str = None,
    port: int = 5432,
    db: str = None,
):
    """
    Generate a database URI string with optional overrides for any env variable
    @param driver: default "postgres"
    @param user
    @param password
    @param host
    @param port: default 5432
    @param db
    @return: string URI
    """
    driver = os.getenv("DB_DRIVER") or driver
    user = os.getenv("DB_USER") or user
    password = os.getenv("DB_PASSWORD") or password
    host = os.getenv("DB_HOST") or host
    port = os.getenv("DB_PORT") or port
    db = os.getenv("DB_NAME") or db

    for uri_key, uri_val in [
        ("user", user),
        ("password", password),
        ("host", host),
        ("db", db),
    ]:
        if uri_val == None:
            raise RuntimeError(f"Incomplete DB URI component given: '{uri_key}'")

    return f"{driver}://{user}:{password}@{host}:{port}/{db}"


def init_db_connection():
    """
    Instantiates a singleton DB engine
    """
    global engine, Session
    if engine != None:
        return
    uri = generate_db_uri()
    engine = create_engine(uri)
    engine.connect()
    Session = sessionmaker(bind=engine)

def create_session():
    global Session
    if Session == None:
        raise RuntimeError(
            """
        Session Maker is None. 
        Please run init_db_connection() before defining tables
        """
        )
    return Session()


def create_table(table):
    """
    Generate table from declarative base definition
    @param table: table which inherits from Base
    """
    global engine
    if engine == None:
        raise RuntimeError(
            """
        DB engine is None. 
        Please run init_db_connection() before defining tables
        """
        )
    table.__table__.create(bind=engine, checkfirst=True)