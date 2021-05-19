from db.sqlalchemy_db import create_table, get_engine
from sqlalchemy import (
    Column,
    Integer,
    Float,
    Boolean,
    String,
    DateTime,
    ForeignKey,
    UniqueConstraint,
)
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


def f_key_column(
        column_attribute: str,
        use_int: bool = False,
        on_delete: str = "CASCADE",
        on_update: str = "CASCADE",
        nullable: bool = False,
):
    if use_int:
        type = Integer
    else:
        type = UUID(as_uuid=True)
    return Column(
        type,
        ForeignKey(column_attribute, ondelete=on_delete, onupdate=on_update),
        nullable=nullable,
    )


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

    @validates("ticker")
    def convert_upper(self, key, value):
        # ensures that all tickers are inserted as uppercase (ex. "tsla" => "TSLA")
        return value.upper()

    @property
    def serialize(self):
        """
        Return JSON serialized version of Stock instance
        @return: JSON
        """
        return {
            "id": self.id,
            "ticker": self.ticker,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class Project(Base):
    """
    Base project table, used as identifier in other tables and allows activating/deactivating a project
    """

    __tablename__ = "project"
    __table_args__ = (UniqueConstraint("user_id", "project_name"),)

    id = p_key_column()
    project_name = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    # user_id = f_key_column(column_attribute="Users.id")
    # TODO: this is a dummy column until I can figure out how to autopopulate a Users table here
    user_id = Column(String)

    @property
    def serialize(self):
        """
        Return JSON serialized version of  instance
        @return: JSON
        """
        return {
            "id": self.id,
            "project_name": self.project_name,
            "description": self.description,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


class ProjectStock(Base):
    """
    Relationship table allowing stocks to be linked to a project
    """

    __tablename__ = "project_stock"

    id = p_key_column()
    project_id = f_key_column(column_attribute="project.id")
    stock_id = f_key_column(column_attribute="stock.id")
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)


class NewsSource(Base):
    __tablename__ = "news_source"

    id = p_key_column()
    source_name = Column(String(50), nullable=False, unique=True)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    @property
    def serialize(self):
        """
        Return JSON serialized version of  instance
        @return: JSON
        """
        return {
            "id": self.id,
            "source_name": self.source_name,
        }


class NewsArticle(Base):
    __tablename__ = "news_article"

    id = p_key_column()
    source_id = f_key_column("news_source.id")
    stock_id = f_key_column("stock.id")
    date_published = Column(DateTime(), default=get_datettime)
    avg_sentiment = Column(Float(), nullable=False)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    @property
    def serialize(self):
        """
        Return JSON serialized version of Stock instance
        @return: JSON
        """
        return {
            "id": self.id,
            "ticker": self.sourceid,
            "stock_id": self.stockid,
            "date_published": self.datepublished,
            "avg_sentiment": self.avgsentiment,
            "main_token": self.maintoken,
        }


def instantiate_tables():
    """
    Define all tables, should be called only once
    """
    for table in [Stock, Project, ProjectStock, NewsSource, NewsArticle]:
        create_table(table)
