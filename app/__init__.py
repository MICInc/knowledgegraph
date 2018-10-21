'''
  app.py
  authors: Justin Chen & Devin de Hueck
  date: 10.14.2018
'''
from flask import Flask, Blueprint
from flask_restful import Api
from config import Config

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

def create_app(config_class=Config):
  app = Flask(__name__)
  app.config.from_object(config_class)

  # Register blueprints from modules here!
  app.register_blueprint(api_bp)

  return app