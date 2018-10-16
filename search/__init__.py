'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length

class SearchForm(FlaskForm):
	terms = StringField('search', validators=[InputRequired()])


	def filter(terms):
		pass


	def search():
		return db.search(filter(terms))
