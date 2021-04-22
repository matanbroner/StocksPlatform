from flask import g, request, Blueprint
from db.handlers.project_handler import (
    get_project_by_id,
    get_all_user_projects,
    create_project,
    delete_project_by_id,
    update_project_by_id,
    add_stock_to_project,
)
from api import json_response
from api.middleware import auth_middleware

router = Blueprint("project_router", __name__)

@router.route("/", defaults={"project_id": None}, methods=["GET"])
@router.route("/<project_id>", methods=["GET"])
@auth_middleware
def get_project(project_id: str = None):
    try:
        if project_id:
            data = get_project_by_id(id=project_id)
            if not data:
                raise RuntimeError(f"No project found with ID {project_id}")
        else:
            data = get_all_user_projects(user_id=g.user_id)
        return json_response(status_code=200, data=data)
    except Exception as e:
        return json_response(status_code=404, error=str(e))
