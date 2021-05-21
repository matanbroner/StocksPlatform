from flask import request, Blueprint
from db import create_session

from db.handlers.news_articles_handler import (
    create_news_article,
    get_all_news_articles_by_ticker,
    get_all_news_articles_by_source,
    get_all_news_articles,
    get_sentiment_for_ticker
)
from db.handlers.news_source_handler import get_all_news_sources

from api import json_response

router = Blueprint('nlp_router', __name__)

@router.route('/newsarticles/<ticker>', methods=['GET'])
def get_news_articles_by_ticker(ticker: str):
    """
    Gets all news articles associated with a specific stock ticker.
    @param ticker: ex. TSLA
    @return: json
    """
    try:
        articles = get_all_news_articles_by_ticker(ticker)
        if articles is None:
            raise RuntimeError(f"No articles associated with {ticker}.")

        return json_response(status_code=200, data=articles)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/newsarticles/<ticker>/<int:time_frame>', methods=['GET'])
def get_news_articles_by_ticker_in_time_frame(ticker: str, time_frame: int):
    """
    Gets all news articles associated with a specific stock ticker.
    @param ticker: ex. TSLA
    @param time_frame: time frame in days
        ex. 1 week, time_frame = 7
            1 month, time_frame = 31
            1 year, time_frame = 365
    @return: json
    """
    try:
        articles = get_all_news_articles_by_ticker(ticker, time_frame)
        if articles is None:
            raise RuntimeError(
                f"No articles associated with {ticker} and the given time frame {time_frame} days.")

        return json_response(status_code=200, data=articles)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/newsarticles/<source>', methods=['GET'])
def get_news_articles_by_source(source: str):
    """
    GET request for news articles by Source
    @param source: source name
    @return: JSON response with all news articles associated with source
    """
    try:
        articles = get_all_news_articles_by_source(source)
        if articles is None:
            raise RuntimeError(
                f"No articles exist associated with the source {source}")

        return json_response(status_code=200, data=articles)

    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/newsarticles/<source>/<int:time_frame>', methods=['GET'])
def get_news_articles_by_source_in_time_frame(source: str, time_frame: int):
    """
    GET request for news articles by Source
    @param source: source name
    @param time_frame: time frame in days
        ex. 1 week, time_frame = 7
            1 month, time_frame = 31
            1 year, time_frame = 365
    @return: JSON response with all news articles associated with source
    """
    try:
        articles = get_all_news_articles_by_source(source, time_frame)
        if articles is None:
            raise RuntimeError(
                f"No articles exist associated with the source {source} and given time frame {time_frame} days.")

        return json_response(status_code=200, data=articles)

    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/<ticker>/sentiment', method=['GET'])
def get_stock_sentiment(ticker: str):
    """
    Get average sentiment of stock.
    @param ticker: ex. TSLA
    @return: json
    """
    try:
        sentiment = get_sentiment_for_ticker(ticker)
        if sentiment is None:
            return RuntimeError(f'Average sentiment for {ticker} is not available')

        return json_response(status_code=200, data=sentiment)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/<ticker>/sentiment/<int:time_frame>', method=['GET'])
def get_stock_sentiment_in_time_frame(ticker: str, time_frame: int):
    """
    Get average sentiment of stock.
    @param ticker: ex. TSLA
    @param time_frame: time frame in days
        ex. 1 week, time_frame = 7
            1 month, time_frame = 31
            1 year, time_frame = 365
    @return: json
    """
    try:
        sentiment = get_sentiment_for_ticker(ticker, time_frame)
        if sentiment is None:
            return RuntimeError(f'Average sentiment for {ticker} and time frame {time_frame} is not available.')

        return json_response(status_code=200, data=sentiment)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )
