from db import create_session
from db.models import Stock, NewsArticles, NewsSources
from sqlalchemy import func
from date import date


def get_ticker_id(ticker: str):
    """
    Returns primary key id based on ticker
    @params: str
    @return: int
    """
    with create_session as session:
        try:
            query = session.query(Stock.id).filer(ticker == Stock.ticker)
            return query
        except Exception:
            return None


def add_news_article(source: str, title: str, ticker: str, avg_sentiment: float, published_date: datetime.date):
    """
    Adds news article 
    @params str for soucre, date published in date format, an avarge sentiment and a main token
    @returns - no return 
    """
    with create_session as session:
        try:

            news_article = NewsArticles()
            news_article.stockid = get_ticker_id(ticker)
            news_article.title = title
            news_article.avgsentiment = avg_sentiment
            news_article.datepublished = published_date
            session.add(news_article)
            session.commit()

        except Exception as e:
            return e


def getSentimentByStock(stock_id: str):
    """
    Returns an Avarge sentiment of a stock based on news articles
    @params: ticker of stick which is a str
    @returns : numeric() value
    """
    with create_session as session:
        try:

            query = session.query(func.avg(NewsArticles.avgsentiment).label(
                'average')).filter(NewsArticles.stockid == stock_id)
            return query
        except Exception:
            return None


def get_all_news_articles():

    with create_session as session:
        try:

            articles = session.query(NewsArticles).all()
            return [articles.serialize for a in articles]


def get_articles_by_source(source: str):

    with create_session as session:
        try:
            sID = session.query(NewsSources.id).filter(
                source == NewsSources.sourcename)
            query = session.query(NewsArticles).all().filter(
                sID == NewsArticles.sourceid)
        return query

        except Exception:
            return None


def get_articles_by_stock(stock_id: str):
    with create_session as session:
        try:
            data = session.query(NewsArticles).filter(
                stock_id == NewsArticles.stockid)
            return data
        except Exception
        return None
