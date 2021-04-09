from flask import Blueprint
from db import create_session
from db.models import Stock
from api import json_response

router = Blueprint('stock_router', __name__)

@stock_router.route('/', methods=["GET"])
def get_all_stocks():
    session = create_session()
    try:
        stocks = session.query(Stock).all()
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
        