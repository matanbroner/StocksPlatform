from api.v1.stock import router as stock_router

def init_router(app):
    app.register_blueprint(stock_router, url_prefix='/stock')