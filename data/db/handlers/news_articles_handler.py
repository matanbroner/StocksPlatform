from db import create_session
from db.models import Stock, NewsArticle, NewsSource
from sqlalchemy import func
from datetime import datetime, date, timedelta
from statistics import mean

from db.handlers.stock_handler import get_stock_by_ticker
from db.handlers.news_source_handler import get_news_source_by_name


def create_news_article(source_id: str, stock_id: str, avg_sentiment: float, headline: str, url: str, published_date: date = None):
    """
    Adds news article 
    @params str for soucre, date published in date format, an avarge sentiment and a main token
    @return: newly created news article
    """
    with create_session() as session:
        try:
            article = NewsArticle(
                source_id=source_id,
                stock_id=stock_id,
                avg_sentiment=avg_sentiment,
                headline=headline,
                article_link=url,
                date_published=published_date
            )
            session.add(article)
            session.commit()
            return article.serialize
        except Exception as e:
            raise e


def get_news_article_by_id(id: str, serialize=True):
    """
    Returns primary key id based on ticker
    @params: str
    @return: news article or None if not found
    """
    with create_session() as session:
        article = session.get(NewsArticle, id)
        if article == None:
            return None
        elif serialize:
            article = article.serialize
        return article


def get_news_article_by_ticker_and_source_and_headline(ticker: str, source_name: str, headline: str):
    """
    Get news article by its foreign key source id and headline
    @param ticker: id of stock foreign key
    @param source_name: id of source foreign key
    @param headline: ex. "Apple releases new iPhone"
    @return: JSON or raise RuntimeException if not found
    """
    with create_session() as session:
        try:
            try:
                stock_id = get_stock_by_ticker(ticker)['id']
                source_id = get_news_source_by_name(source_name)['id']
            except:
                return None

            article = session.query(NewsArticle).filter(
                NewsArticle.stock_id == stock_id,
                NewsArticle.source_id == source_id,
                NewsArticle.headline.like(headline)).first()

            return article.serialize if article is not None else None
        except Exception as e:
            raise e


def get_all_news_articles_by_source(source_name: str, time_frame: int = None):
    """
    Returns all news articles associated with a given source
    @param source_name: name of source
    @return: all news articles associated with source or None if not found
    """
    with create_session() as session:
        try:
            try:
                source_id = get_news_source_by_name(source_name)['id']
            except:
                return None
                
            if time_frame is not None:
                date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

                articles = session.query(NewsArticle).filter(
                    NewsArticle.source_id == source_id,
                    NewsArticle.date_published >= date_limit
                )
            else:
                articles = session.query(NewsArticle).filter(
                    NewsArticle.source_id == source_id
                )

            return [article.serialize for article in articles]
        except Exception as e:
            raise e


def get_all_news_articles_by_stock_id(stock_id: str):
    """
    Returns all news articles associated with a stock id foreign key
    @param stock_id: id of stock foreign key
    @return: all news articles associated with source or None if not found
    """
    with create_session() as session:
        try:
            articles = session.query(NewsArticle).filter(
                NewsArticle.stock_id == stock_id)

            return [article.serialize for article in articles]
        except Exception as e:
            raise e


def get_all_news_articles_by_ticker(ticker: str, time_frame: int = None):
    """
    Returns all news articles associated with a stock id foreign key
    @param stock_id: ex. TSLA
    @return: all news articles associated with source or None if not found
    """
    with create_session() as session:
        try:
            try:
                stock_id = get_stock_by_ticker(ticker)['id']
            except:
                return None

            if time_frame is not None:
                date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id,
                    NewsArticle.date_published >= date_limit
                )
            else:
                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id
                )

            return [article.serialize for article in articles]
        except Exception as e:
            raise e


def get_all_news_articles_by_ticker_and_source(ticker: str, source_name: str, time_frame: int = None):
    """
    Get news article by its foreign key source id and headline
    @param ticker: id of stock foreign key
    @param source_name: id of source foreign key
    @param headline: ex. "Apple releases new iPhone"
    @return: JSON or raise RuntimeException if not found
    """
    with create_session() as session:
        try:
            try:
                stock_id = get_stock_by_ticker(ticker)['id']
                source_id = get_news_source_by_name(source_name)['id']
            except:
                return None

            if time_frame is not None:
                date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id,
                    NewsArticle.source_id == source_id,
                    NewsArticle.date_published >= date_limit)
            else:
                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id,
                    NewsArticle.source_id == source_id)

            return [article.serialize for article in articles]
        except Exception as e:
            raise e

def get_all_news_articles(time_frame: int = None):
    """
    Get all news articles
    @return: JSON
    """
    with create_session() as session:
        if time_frame is not None:
            date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

            articles = session.query(NewsArticle).filter(
                NewsArticle.date_published >= date_limit
                )
        else:
            articles = session.query(NewsArticle).all()

        return [article.serialize for article in articles]


def get_sentiment_for_stock_id(stock_id: str, time_frame: int = None):
    """
    Returns average sentiment of a stock over a given timeframe
    @param stock_id: id of stock foreign key
    @param time_frame: how many days ago to calculate sentiment
    @return: floating point average sentiment
    """
    with create_session() as session:
        try:
            if time_frame is not None:
                date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id,
                    NewsArticle.date_published >= date_limit
                    )
            else:
                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id
                    )

            sentiment = mean([article.serialize['avg_sentiment'] for article in articles])
            return sentiment
        except Exception as e:
            raise e


def get_sentiment_for_ticker(ticker: str, time_frame: int = None):
    """
    Returns an average sentiment of a stock over a given timeframe
    @param ticker: ex. TSLA
    @param time_frame: how many days ago to calculate sentiment
    @return: floating point average sentiment or None if stock not found
    """
    with create_session() as session:
        try:
            try:
                stock_id = get_stock_by_ticker(ticker)['id']
            except:
                return None

            if time_frame is not None:
                date_limit = datetime(datetime.today().year, datetime.today().month, datetime.today().day) - timedelta(days=int(time_frame))

                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id,
                    NewsArticle.date_published >= date_limit
                )
    
            else:
                articles = session.query(NewsArticle).filter(
                    NewsArticle.stock_id == stock_id
                )

            sentiment = mean([article.serialize['avg_sentiment']
                              for article in articles])
            return sentiment
        except Exception as e:
            raise e


def delete_news_article_by_id(id: str):
    """
    Delete a news article using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        article = get_news_article_by_id(id=id, serialize=False)
        if not article:
            raise RuntimeError(
                f"Cannot delete nonexistent article with ID {id}")
        session.delete(article)
        session.commit()
