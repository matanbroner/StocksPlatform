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

@router.route("/", methods=["POST"])
@auth_middleware
def post_project():
    body = request.json
    try:
        project_name = body.get("project_name")
        description = body.get("description")
        tickers = body.get("tickers")
        if not project_name or not description or not tickers:
            raise RuntimeError("Missing attributes for project creation")
        project = create_project(project_name=project_name, description=description, tickers=tickers, user_id=g.user_id)
        return json_response(status_code=200, data=project)
    except Exception as e:
        return json_response(status_code=404, error=str(e))


@router.route("/<project_id>", methods=["PUT"])
@auth_middleware
def put_project(project_id: str):
    try:
        body = request.json
        if not body:
            raise RuntimeError("Missing JSON body for project update")
        updated = update_project_by_id(id=project_id, args=body)
        return json_response(status_code=200, data=updated)
    except Exception as e:
        return json_response(status_code=404, error=str(e))


@router.route("/<project_id>", methods=["DELETE"])
@auth_middleware
def delete_project(project_id: str):
    try:
        delete_project_by_id(id=project_id)
        return json_response(status_code=200, data={})
    except Exception as e:
        return json_response(status_code=404, error=str(e))
