from db.sqlalchemy_db import create_table
from sqlalchemy import (
    Column,
    Integer,
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
    __table_args__ = (UniqueConstraint("user_id", "project_name"), )

    id = p_key_column()
    project_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    # TODO: uncomment this and update table definition once Ronald's changes are in
    # user_id = f_key_column(column_attribute="Users.id")
    # dummy column for feature testing
    user_id = Column(String)

    @property
    def serialize(self):
        """
        Return JSON serialized version of Project instance
        @return: JSON
        """
        return {
            "id": self.id,
            "project_name": self.project_name,
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
    created_at = Column(DateTime, default=get_datettime)
    updated_at = Column(DateTime, default=get_datettime, onupdate=get_datettime)

    project_id = f_key_column(column_attribute="project.id")
    stock_id = f_key_column(column_attribute="stock.id")


def instantiate_tables():
    """
    Define all tables, should be called only once
    """
    for table in [Stock, Project, ProjectStock]:
        create_table(table)
