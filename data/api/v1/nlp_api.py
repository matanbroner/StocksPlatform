from data.db.handlers.news_articles_handler import get_articles_by_stock
from flask import request, Blueprint
from db import create_session
from db.handlers.news_articles_handler import (
    add_news_article,
    get_all_news_articles,
    get_ticker_id,
    getSentimentByStock,
    get_articles_by_source,
    get_articles_by_stock
)
from db.handlers.news_source_handler import get_news_sources

from api import json_response

router = Blueprint('stock_router', __name__)


@router.route('/newsarticles/<stock_id>', methods=['GET'])
def get_news_articles(stock_id: str):
    """
    Gets all news articles associated with a specific stock id
    """
    try:
        data = get_articles_by_stock(stock_id)
        if not data:
            raise RuntimeError(
                f"No article associated with the specific stock")
        return json_response(status_code=200, data=data)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/ticker/sentiment', method=['GET'])
def get_stock_sentiment(stock_id: str):
    """
    returns true if sentiment is positive and False if sentiment is negative
    """
    try:
        data = getSentimentByStock(stock_id)
        if not data:
            return RuntimeError(f'Average sentiment for specific stock id is not available')
        return json_response(status_code=200, data=data)
    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )


@router.route('/newsarticles/<source>', methods=['GET'])
def get_news_articles_by_source(source: str):
    """
    GET request for news articles by Source
    returns all news articles specified by a source,
    if no source is given a list of all news articles is given

    returns JSON  response with all news articles
    """

    try:
        if source:

            data = get_articles_by_source(source)
            if not data:
                raise RuntimeError(
                    f"No articles exist associated with the source {source}")

        else:
            data = get_all_news_articles()
        return json_response(status_code=200, data=data)

    except Exception as e:
        return json_response(
            status_code=404,
            error=str(e)
        )
