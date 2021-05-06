from db.sqlalchemy_db import create_table
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import validates
import uuid
import datetime

Base = declarative_base()


def p_key_column(use_int: bool = False):
    if use_int:
        return Column(Integer, primary_key=True)
    else:
        return Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)


def get_datettime():
    return datetime.datetime.now()


class Stock(Base):
    """
    Base stock table, used as an identifier in other tables
    """
    __tablename__ = "stock"

    id = p_key_column()
    ticker = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime,
                        onupdate=get_datettime)

    @validates('ticker')
    def convert_upper(self, key, value):
        # ensures that all tickers are inserted as uppercase (ex. "tsla" => "TSLA")
        return value.upper()

    @property
    def serialize(self):
        """
        Return JSOn serialized version of Stock instance
        @return: JSON
        """
        return {
            'id': self.id,
            'ticker': self.ticker,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class NewsSources(Base):

    __tablename__ = 'text_sources'

    id = Column('id', Integer, primary_key=True)

    sourcename = Column('user', String(50), nullable=False, unique=True)

    @property
    def serialize(self):
        """
        Return JSOn serialized version of  instance
        @return: JSON
        """
        return {
            'id': self.id,
            'sourcename': self.sourcename,
        }
    ##overallweight = Column(Numeric(), nullable=False, unique=False)


class NewsArticles(Base):

    __tablename__ = 'text_articles'

    id = Column(Integer(), primary_key=True)

    sourceid = Column(Integer(), ForeignKey(NewsSources.id))

    stockid = Column(Integer(), ForeignKey(Stock.id))

    datepublished = Column(DateTime(), default=get_datettime)

    avgsentiment = Column(Numeric(), nullable=False)

    ##overallWeight = Column(Numeric(), ForeginKey(NewsSources.overallweight))

    @property
    def serialize(self):
        """
        Return JSOn serialized version of Stock instance
        @return: JSON
        """
        return {
            'id': self.id,
            'ticker': self.sourceid,
            'stock_id': self.stockid,
            'date_published': self.datepublished
            'avg_sentiment': self.avgsentiment
            'main_token': self.maintoken
        }


def instantiate_tables():
    """
    Define all tables, should be called only once
    """
    for table in [Stock]:
        create_table(table)
