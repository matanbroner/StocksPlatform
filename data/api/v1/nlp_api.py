from flask import request, Blueprint
from db import create_session
from db.handlers.news_articles_handler import (
    add_news_article,
    get_all_news_articles,
    get_ticker_id,
    getSentimentByStock,
    get_articles_by_source
)
from db.handlers.news_source_handler import get_news_sources

from api import json_response

router = Blueprint('stock_router', __name__)


@router.route('/newsarticles', methods=['GET'])
def get_news_articles(stock_id: str):
    """
    Gets all news articles associated with a specific stock
    """


@router.route('/ticker/sentiment', method=['GET'])
def get_stock_sentiment(stock_id: str):
    """
    returns true if sentiment is positive and False if sentiment is negative
    """


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
            """
            querry :
            Select *
            From NewsArtielces na
            Where ns.source = source
            """
            data = get_articles_by_source(source)
            if not data:
                raise RuntimeError(
                    f"No articles exist associated with the source {source}")

        else:
            data = get_all_news_articles()
        return json_response(status_code=200, data=data)

    except:
        return json_response(
            status_code=404,
            error=str(e)
        )
