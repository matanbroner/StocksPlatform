from db import create_session
from db.models import NewsSource


def get_news_source_by_id(id: str):
    """
    Get news source by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        source = session.get(NewsSource, id)
        return source.serialize if source else None


def get_news_source_by_name(source_name: str):
    """
    Get news source by associated name
    @param source_name: ex. "reddit"
    @return: JSON or raise RuntimeException if not found
    """
    with create_session() as session:
        source = session.query(NewsSource).filter(NewsSource.source_name == source_name).first()
        return source.serialize if source else None


def get_all_news_sources():
    """
    Get all news sources
    @return: JSON
    """
    with create_session() as session:
        sources = session.query(NewsSource).all()
        return [source.serialize for source in sources]


def create_news_source(source_name: str):
    """
    Create a new stock based on an associated ticker
    @param source_name: ex. "reddit"
    @return: JSON (new news source) or raise RuntimeError if already exists
    """
    with create_session() as session:
        try:
            exists = get_news_source_by_name(source_name=source_name)
            if exists:
                raise RuntimeError(
                    f"News source with associated name {source_name} already exists"
                )
            source = NewsSource(source_name=source_name)
            session.add(source)
            # must commit before new news source can be fetched from DB table
            session.commit()
            return get_news_source_by_name(source_name=source_name)
        except Exception as e:
            raise e


def delete_news_source_by_id(id: str):
    """
    Delete a news source using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        source = get_news_source_by_id(id=id)
        if not source:
            raise RuntimeError(f"Cannot delete nonexistent news source with ID {id}")
        source.delete()
        session.commit()
