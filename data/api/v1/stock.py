from flask import Blueprint
from db import create_session
from db.handlers.stock_handler import (
    get_all_stocks,
    get_stock_by_id,
    get_stock_by_ticker,
    create_stock
)
from api import json_response

router = Blueprint('stock_router', __name__)


@router.route('/', defaults={'stock_id': None}, methods=["GET"])
@router.route('/<stock_id>', methods=["GET"])
def get_stock(stock_id):
    """
    GET request for stocks
    Returns all stocks if no ID given in URL, or one stock by ID
    @param stock_id: primary key
    @return: JSON

    ex.
        - http://localhost:5000/stock       => returns all stocks
        - http://localhost:5000/stock/12    => return single stock with ID 12 or None
    """
    try:
        if stock_id:
            data = get_stock_by_id(id=stock_id)
        else:
            data = get_all_stocks()
        return json_response(
            status_code=200,
            data=data
        )

    except Exception as e:
        return json_response(
            status_code=500,
            error=str(e)
        )


@router.route('/ticker/<ticker>', methods=["GET"])
def get_stock_ticker(ticker: str):
    """
    GET request for a single stock by an associated ticker
    Returns a single stocks which matches the given ticker
    @param ticker: ex. "TSLA"
    @return: JSON

    ex.
        - http://localhost:5000/ticker/TSLA
    """
    try:
        data = get_stock_by_ticker(ticker=ticker)
        return json_response(
            status_code=200,
            data=data
        )

    except Exception as e:
        return json_response(
            status_code=500,
            error=str(e)
        )
