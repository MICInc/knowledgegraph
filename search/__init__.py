'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from database import Database


class SearchForm(FlaskForm):
	def __init__(self, app):
		self.db = Database(app)
		self.terms = StringField('search', validators=[InputRequired()])


	def filter(self, terms):
		return terms


	def search(self, terms):
		return db.search(filter(terms))
