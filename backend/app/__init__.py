from flask import Flask

def create_app():

    app = Flask(__name__)
    app.config['CORS_HEADERS'] = 'Content-Type'
    from .getData import getData as getData_blueprint
    app.register_blueprint(getData_blueprint)
    
    return app