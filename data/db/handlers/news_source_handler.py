from db import create_session
from db.models import NewsSources


def add_news_source(name: str):
    """
    Adds news source to Data Table
    @params str
    @return: None
    """

    with create_session as session:
        try:
            if name not in get_news_sources:
                news_source = NewsSources()
                news_source.sourcename = name
                session.add(news_source)
                session.commit()

        except Exception as e:
            raise e


def get_news_sources():
    """
    returns all news sources
    @params: None
    @returns: JSON
    """
    with create_session as session:
        sources = session.query(NewsSources).all()
        return [sources.serialize for s in sources]
