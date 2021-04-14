import os
from flask import Flask
from db import init_db_connection, instantiate_tables
from api.v1 import init_router

# keep debug mode on while not in production
# allows for hot reloading on code changes
is_production = os.getenv("ENV") == "production"
port = os.getenv("port") or 5000

app = Flask(__name__)


@app.route("/")
def health_check():
    return "OK"


def init_app():
    init_db_connection()
    instantiate_tables()
    init_router(app)


if __name__ == "__main__":
    init_app()
    app.run(host="0.0.0.0", port=port, debug=not is_production)
