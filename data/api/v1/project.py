from flask import request, Blueprint
from db.handlers.project_handler import (
    get_project_by_id,
    get_all_user_projects,
    create_project,
    delete_project_by_id
)
from api import json_response

router = Blueprint("project_router", __name__)
