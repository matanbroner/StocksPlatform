from db import create_session
from db.models import Stock


def get_stock_by_id(id: str, serialize=True):
    """
    Get stock by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        stock = session.get(Stock, id)
        if stock == None:
            return None
        elif serialize:
            stock = stock.serialize
        return stock


def get_stock_by_ticker(ticker: str):
    """
    Get stock by associated ticker
    @param ticker: ex. "TSLA"
    @return: JSON or raise RuntimeException if not found
    """
    ticker = ticker.upper()
    with create_session() as session:
        stock = session.query(Stock).filter(Stock.ticker == ticker).first()
        return stock.serialize if stock else None


def get_all_stocks():
    """
    Get all stocks
    @return: JSON
    """
    with create_session() as session:
        stocks = session.query(Stock).all()
        return [stock.serialize for stock in stocks]


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
                raise RuntimeError(
                    f"Stock with associated ticker {ticker} already exists"
                )
            stock = Stock(ticker=ticker)
            session.add(stock)
            # must commit before new stock can be fetched from DB table
            session.commit()
            return get_stock_by_ticker(ticker=ticker)
        except Exception as e:
            raise e


def delete_stock_by_id(id: str):
    """
    Delete a stock using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        stock = get_stock_by_id(id=id, serialize=False)
        if not stock:
            raise RuntimeError(f"Cannot delete nonexistent stock with ID {id}")
        session.delete(stock)
        session.commit()
