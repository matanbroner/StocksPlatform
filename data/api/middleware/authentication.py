from flask import g, request
from functools import wraps
from api import json_response
import requests


def auth_token_is_valid(token: str):
    """
    Send auth token to Users Service for verification
    @param token: bearer token
    @return: bool
    """
    if not token:
        return False
    try:
        res = requests.post("http://users:5001/jwt/verify", json={"token": token})
        res.raise_for_status()
        user = res.json().get("data")
        g.user_id = str(user["id"])
        return True
    except Exception as e:
        return False


def auth_middleware(f):
    """
    Authorization middleware which expects a bearer token as an "Authroization" header
    @param f: Flask route
    @return: middleware function
    """

    @wraps(f)
    def authenticate_header(*args, **kwargs):
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                raise RuntimeError("Missing authorization header")
            auth_token = auth_header.split()
            if len(auth_token) != 2 or auth_token[0] != "Bearer":
                raise RuntimeError("Malformed authorization header")
            # Get actual token, split off 'Bearer'
            auth_token = auth_token[1]
            if not auth_token_is_valid(token=auth_token):
                raise RuntimeError("Unauthorized token")
            return f(*args, **kwargs)
        except Exception as e:
            return json_response(status_code=403, error=str(e))

    return authenticate_header
