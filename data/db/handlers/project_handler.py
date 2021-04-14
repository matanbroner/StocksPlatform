from db import create_session
from db.models import Project

from db import create_session
from db.models import Stock


def get_project_by_id(id: str):
    """
    Get project by primary key
    @param id: UUID
    @return: JSON
    """
    with create_session() as session:
        project = session.get(Project, id)
        return project.serialize if project else None


def get_all_user_projects(user_id: str):
    """
    Get all projects associated with a user
    @param user_id: UUID
    @return: JSON
    """
    with create_session() as session:
        projects = session.query(Project).filter(Project.user_id == user_id)
        return [project.serialize for project in projects]


def create_project(project_name: str, user_id: str):
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
            project = Project(project_name=project_name)
            session.add(project)
            # must commit before new stock can be fetched from DB table
            session.commit()
            return project.serialize
        except Exception as e:
            raise e


def delete_project_by_id(id: str):
    """
    Delete a project using a primary key ID
    @param id: UUID
    """
    with create_session() as session:
        project = get_project_by_id(id=id)
        if not project:
            raise RuntimeError(f"Cannot delete nonexistent project with ID {id}")
        project.delete()
        session.commit()
