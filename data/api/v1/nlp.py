from flask import request, Blueprint
from db import create_session

from db.handlers.news_articles_handler import (
    create_news_article,
    get_all_news_articles_by_ticker,
    get_all_news_articles_by_source,
    get_all_news_articles_by_ticker_and_source,
    get_all_news_articles,
    get_sentiment_for_ticker
)
from db.handlers.news_source_handler import get_all_news_sources

from api import json_response

router = Blueprint('nlp_router', __name__)

@router.route('/article', methods=['GET'])
def get_news_articles():
    """
    Gets all news articles associated with a specific stock ticker.
    @param ticker: ex. TSLA
    @param source: name of news source
    @arg time_frame: time frame in days
        ex. 1 week, time_frame = 7
            1 month, time_frame = 31
            1 year, time_frame = 365
    @return: json
    """
    try:
        ticker = request.args.get("ticker")
        source = request.args.get("source")
        time_frame = request.args.get("time_frame")
        
        if not ticker and not source:
            raise RuntimeError(
                "Must include a 'ticker' or 'source' query-string arg to search for news articles"
            )

        if ticker and source:
            articles = get_all_news_articles_by_ticker_and_source(ticker, source, time_frame)
        elif ticker:
            articles = get_all_news_articles_by_ticker(ticker, time_frame)
        elif source:
            articles = get_all_news_articles_by_source(source, time_frame)

        if articles is None:
            raise RuntimeError(f"No articles associated with {ticker}.")

        return json_response(status_code=200, data=articles)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )

@router.route('/sentiment/<ticker>', methods=['GET'])
def get_stock_sentiment(ticker: str):
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
        time_frame = request.args.get("time_frame")

        sentiment = get_sentiment_for_ticker(ticker, time_frame)

        if sentiment is None:
            return RuntimeError(f'Average sentiment for {ticker} is not available')

        return json_response(status_code=200, data=sentiment)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )
