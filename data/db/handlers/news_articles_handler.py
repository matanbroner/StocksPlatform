from db import create_session
from db.models import NewsArticle
from sqlalchemy import func
from datetime import date


def get_news_article_by_id(id: str):
    """
    Get news article by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        article = session.get(NewsArticle, id)
        return article.serialize if article else None


def get_news_article_by_source_id_and_headline(source_id: str, headline: str):
    """
    Get news article by its foreign key source id and headline
    @param source_id: id of source foreign key
    @param headline: ex. "Apple releases new iPhone"
    @return: JSON or raise RuntimeException if not found
    """
    with create_session() as session:
        article = session.query(NewsArticle).filter(
            NewsArticle.source_id == source_id, NewsArticle.headline.like(headline)).first()
        return article.serialize if article else None


def get_all_news_articles():
    """
    Get all news articles
    @return: JSON
    """
    with create_session() as session:
        articles = session.query(NewsArticle).all()
        return [article.serialize for article in articles]


def create_news_article(source_id: str, stock_id: str, avg_sentiment: float, headline: str, published_date: date = None):
    """
    Create a new news article
    @param source_id: primary key of associated news source
    @param ticker_id: primary key of associated ticker
    @param avg_sentiment
    @param published_date
    @return: JSON (new news article)
    """
    with create_session() as session:
        try:
            article = NewsArticle(
                source_id=source_id,
                stock_id=stock_id,
                headline=headline,
                avg_sentiment=avg_sentiment,
                date_published=published_date
            )
            session.add(article)
            session.commit()
            return article.serialize
        except Exception as e:
            raise e


def delete_news_article_by_id(id: str):
    """
    Delete a news article using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        article = get_news_article_by_id(id=id)
        if not article:
            raise RuntimeError(f"Cannot delete nonexistent article with ID {id}")
        article.delete()
        session.commit()


def get_average_sentiment_by_ticker(ticker_id: str):
    """
    Returns an average sentiment of a stock based on its associated news articles
    @param ticker_id: primary key of associated ticker
    @returns: floating point average sentiment
    """
    with create_session as session:
        try:
            average_query = session.query(
                func.avg(NewsArticle.avg_sentiment).label('average')).filter(NewsArticle.stock_id == ticker_id)
            return average_query
        except Exception as e:
            raise e
