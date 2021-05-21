from api.v1.stock import router as stock_router
from api.v1.project import router as project_router
from api.v1.nlp_api import router as nlp_router

def init_router(app):
    app.register_blueprint(stock_router, url_prefix="/stock")
    app.register_blueprint(project_router, url_prefix="/project")
    app.register_blueprint(nlp_router, url_prefix="/news")
