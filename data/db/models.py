from db.sqlalchemy_db import create_table
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
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
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    @validates('ticker')
    def convert_upper(self, key, value):
        return value.upper()


def instantiate_tables():
    """
    Define all tables, should be called only once
    """
    for table in [Stock]:
        create_table(table)
