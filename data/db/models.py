from db.sqlalchemy_db import Base, create_table
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
import datetime

def p_key_column(use_int: bool = False):
    if use_int:
        return Column(Integer, primary_key=True)
    else:
        return Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

def get_datettime():
    return datetime.datetime.now()

class Stock(Base):
    """
    Base stock table, used as an indentifier in other tables
    """
    __tablename__ = "stock"

    id = p_key_column()
    ticker = Column(String)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

def instantiate_tables():
    """
    Define all tables, should be called only once
    """
    for table in [Stock]:
        create_table(table)

