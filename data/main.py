from flask import Flask
from db import init_db_connection, instantiate_tables

app = Flask(__name__)


@app.route("/")
def health_check():
    return "OK"

def init_app():
    init_db_connection()
    instantiate_tables()

if __name__ == "__main__":
    init_app()
    app.run(host="0.0.0.0", port=5000)
