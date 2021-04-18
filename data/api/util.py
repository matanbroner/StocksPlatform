from flask import make_response
import warnings

def json_response(status_code: int, data=None, error=None):
    is_error = status_code < 200 or status_code > 299
    if is_error and data != None:
        warnings.warn(
            f"""
        Used status code {status_code} but still included JSON data: {data}\n
        Will ignore this data in accordance with REST protocol standards.
        """
        )

    response = {
        "status": status_code,
    }
    if is_error:
        # best to not include None in response for UI's sake
        response["error"] = error or ""
    else:
        response["data"] = data
    return make_response(response, status_code)
