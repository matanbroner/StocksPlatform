from db import create_session
from db.models import Stock


def get_stock_by_id(id: str):
    """
    Get stock by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        stock = session.get(Stock, id)
        return stock


def get_stock_by_ticker(ticker: str):
    """
    Get stock by associated ticker
    @param ticker: ex. "TSLA"
    @return: JSON or raise RuntimeException if not found
    """
    ticker = ticker.upper()
    with create_session() as session:
        try:
            stock = session.query(Stock).filter(ticker=ticker).one()
            return stock
        except Exception:
            raise RuntimeError(f"No stock found with associated ticker {ticker}")


def get_all_stocks():
    """
    Get all stocks
    @return: JSON
    """
    with create_session() as session:
        stocks = session.query(Stock).all()
        return stocks


def create_stock(ticker: str):
    """
    Create a new stock based on an associated ticker
    @param ticker: ex. "TSLA"
    @return: JSON (new stock) or raise RuntimeError if already exists
    """
    ticker = ticker.upper()
    with create_session() as session:
        try:
            exists = get_stock_by_ticker(ticker=ticker)
            if exists:
                raise RuntimeError(f"Stock with associated ticker {ticker} already exists")
        except Exception:
            stock = Stock(ticker=ticker)
            session.add(stock)
            return stock
