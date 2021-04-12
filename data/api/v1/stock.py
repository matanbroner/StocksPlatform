from flask import Blueprint
from db import create_session
from db.models import Stock
from api import json_response

router = Blueprint('stock_router', __name__)

@stock_router.route('/', defaults={'stock_id': None}, methods=["GET"])
@stock_router.route('/<stock_id>', methods=["GET"])
def get_stock(stock_id):
    session = create_session()
    try:
        if stock_id:
            stocks = session.query(Stock).filter()
        return json_response(
            status_code=200,
            data=stocks
        )
    except Exception as e:
        return json_response(
            status_code=500,
            error=str(e)
        )
    finally:
        session.close()
        