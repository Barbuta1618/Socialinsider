from flask import Flask

def create_app():

    app = Flask(__name__)

    from .getData import getData as getData_blueprint
    app.register_blueprint(getData_blueprint)
    
    return app