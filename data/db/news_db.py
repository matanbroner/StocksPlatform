from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, String, Numeric, Integer, DateTime, ForeignKey, func
from datetime import datetime
from models import Stock


engine = create_engine('sqlite:///:memory:', echo=True)
Base = declarative_base()


class NewsSources(Base):
    __tablename__ = 'text_sources'

    id = Column('id', Integer, primary_key=True)
    sourcename = Column('user', String(50), nullable=False, unique=True)
    ##overallweight = Column(Numeric(), nullable=False, unique=False)


class NewsArticles(Base):
    __tablename__ = 'text_articles'
    id = Column(Integer(), primary_key=True)
    sourceid = Column(Integer(), ForeignKey(NewsSources.id))
    stockid = Column(Integer(), ForeignKey(Stock.id))
    datepublished = Column(DateTime(), default=datetime.now())
    avgsentiment = Column(Numeric(), nullable=False)
    maintoken = Column(String(20), nullable=True)
    ##overallWeight = Column(Numeric(), ForeginKey(NewsSources.overallweight))


Session = sessionmaker(engine)
session = Session()


def add_news_source(name: str):
    """
    Adds news source to Data Table
    @params str
    @return: None
    """
    news_source = NewsSources()
    news_source.sourcename = name
    session.add(news_source)
    session.commit()
    session.close()


def add_news_article(source: str, ticker: str, avg_sentiment: float, main_token: str):
    """
    Adds news article 
    @params str for soucre, date published in date format, an avarge sentiment and a main token
    @returns - no return 
    """
    news_article = NewsArticles()
    news_article.stockid = get_ticker_id(ticker)
    news_article.avgsentiment = avg_sentiment
    news_article.maintoken = news_article.main_token

    session.add(news_article)
    session.commit()
    session.close()


def get_news_sources():
    """
    Prints a list of all news sources
    @params: None
    @returns:str
    """
    sources = session.query(NewsSources).all()

    for s in sources:
        print(s.source)
    session.close()


def get_ticker_id(ticker: str):
    """
    Returns primary key id based on ticker
    @params: str
    @return: int
    """

    query = session.query(Stock.id).filer(ticker == Stock.ticker)
    return query


def getSentimentByStock(ticker: str):
    """
    Returns an Avarge sentiment of a stock based on news articles
    @params: ticker of stick which is a str
    @returns : numeric() value
    """
    id = get_ticker_id(ticker)
    query = session.query(func.avg(NewsArticles.avgsentiment).label(
        'average')).filter(NewsArticles.stockid == id)
    return query


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    add_news_source('cnn')
    add_news_article('cnn', 'TSLA', 0.67, 'iphone')

    print(getSentimentByStock('TSLA'))
