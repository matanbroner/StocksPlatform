from db import create_session
from db.models import Project, ProjectStock, Stock
from db.handlers.stock_handler import (
    get_stock_by_id,
    create_stock
)
from db.util import get_or_create
import warnings


def get_project_by_id(id: str, serialize=True):
    """
    Get project and its associated stocks by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        project = session.get(Project, id)
        if project == None:
            return None
        elif serialize:
            project = project.serialize
            project["stocks"] = get_project_stocks_by_id(project_id=project["id"])
        return project


def get_all_user_projects(user_id: str):
    """
    Get all projects associated with a user
    @param user_id: UUID
    @return: JSON
    """
    with create_session() as session:
        projects = session.query(Project).filter(Project.user_id == user_id).all()
        for i, project in enumerate(projects):
            projects[i] = project.serialize
            projects[i]["stocks"] = get_project_stocks_by_id(project_id=project.id)
        return projects


def get_project_stocks_by_id(project_id: str):
    """
    Returns all stocks associated with a project
    Does not check for project existence
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        project_stocks = session.query(ProjectStock).filter(
            ProjectStock.project_id == project_id
        ).all()
        return (
            [ get_stock_by_id(ps.stock_id) for ps in project_stocks ]
            if project_stocks
            else []
        )


def create_project(project_name: str, description: str, tickers: list, user_id: str):
    """
    Create a new project associated with a user
    @param project_name: ex. "My Project"
    @param user_id: UUID
    @return: JSON (new project) or raise RuntimeError if project already exists for user
    """
    with create_session() as session:
        try:
            exists = (
                session.query(Project)
                    .filter(
                    Project.user_id == user_id, Project.project_name == project_name
                )
                    .first()
            )
            if exists:
                raise RuntimeError(
                    f"User with given ID already has project with name '{project_name}'"
                )
            stock_ids = []
            for ticker in tickers:
                stock = get_or_create(session, Stock, ticker=ticker)
                stock_ids.append(stock.id)
            project = Project(project_name=project_name, description=description, user_id=user_id)
            session.add(project)
            # must commit before new project can be fetched from DB table
            session.commit()
            for stock_id in stock_ids:
                add_stock_to_project(project_id=project.id, stock_id=stock_id)
            return get_project_by_id(id=project.id)
        except Exception as e:
            raise e


def delete_project_by_id(id: str):
    """
    Delete a project using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        project = get_project_by_id(id=id, serialize=False)
        if not project:
            raise RuntimeError(f"Cannot delete nonexistent project with ID {id}")
        session.delete(project)
        session.commit()


def update_project_by_id(id: str, args: dict):
    """
    Given an ID and a dictionary of keys to change, update a project
    @param id: UUID
    @param args: ex. {"project_name": "My Other Project"}
    @return: JSON (updated project)
    """
    with create_session() as session:
        allowed_edit_keys = ['project_name', 'description', 'is_active']
        project = session.get(Project, id)
        if not project:
            raise RuntimeError(f"Cannot update nonexistent project with ID {id}")
        for col, val in args.items():
            if not hasattr(project, col):
                warnings.warn(f"Attempted updating invalid project column {col}")
            elif col not in allowed_edit_keys:
                warnings.warn(f"Attempted updating restricted project column {col}")
            else:
                setattr(project, col, val)
        session.commit()
        return get_project_by_id(id=id, serialize=True)


def add_stock_to_project(project_id: str, stock_id: str):
    """
    Associates a stock with a project
    @param project_id: UUID
    @param stock_id: UUID
    """
    with create_session() as session:
        project = get_project_by_id(id=project_id)
        if not project:
            raise RuntimeError(
                f"Cannot associate stock with nonexistent project ID {project_id}"
            )
        stock = get_stock_by_id(id=stock_id)
        if not stock:
            raise RuntimeError(f"Cannot associate nonexistent stock ID {stock_id}")
        project_stock = ProjectStock(project_id=project_id, stock_id=stock_id)
        session.add(project_stock)
        session.commit()
