'''
  app.py
  authors: Justin Chen & Devin de Hueck
  date: 10.14.2018
'''
from flask import Flask, Blueprint
from flask_restful import Api
from config import Config
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

mongo = PyMongo()
jwt = JWTManager()

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)

  mongo.init_app(app)
  jwt.init_app(app)

  # Register blueprints from modules here!
  app.register_blueprint(api_bp)

  from app.auth import bp as auth_bp
  app.register_blueprint(auth_bp)

  return app