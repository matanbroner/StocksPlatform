from db import create_session
from db.models import Stock, NewsArticles
from sqlalchemy import func


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


def add_news_article(source: str, ticker: str, avg_sentiment: float, main_token: str):
    """
    Adds news article 
    @params str for soucre, date published in date format, an avarge sentiment and a main token
    @returns - no return 
    """
    with create_session as session:
        try:

            news_article = NewsArticles()
            news_article.stockid = get_ticker_id(ticker)
            news_article.avgsentiment = avg_sentiment
            news_article.maintoken = news_article.maintoken
            session.add(news_article)
            session.commit()

        except Exception as e:
            return e


def getSentimentByStock(ticker: str):
    """
    Returns an Avarge sentiment of a stock based on news articles
    @params: ticker of stick which is a str
    @returns : numeric() value
    """
    with create_session as session:
        try:

            id = get_ticker_id(ticker)
            query = session.query(func.avg(NewsArticles.avgsentiment).label(
                'average')).filter(NewsArticles.stockid == id)
            return query
        except Exception:
            return None


def get_all_news_articles():

    with create_session as session:
        try:

            articles = session.query(NewsArticles).all()
            return [articles.serialize for a in articles]
