'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask import request
from flash_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from database import Database
db = Database()


class LoginForm(FlaskForm):
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	remember = BooleanField('remember me')


class SignupForm(FlaskForm):
	email 	 = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	gender = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	dob = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	ethnicity = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	education = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class SearchForm(FlaskForm):
	terms = StringField('search', validators=[InputRequired()])


	def filter(terms):
		pass


	def search():
		return db.search(filter(terms))


class UserProfile(object):
	email = email
	username = ''
	pw = pw
	gender = ''
	dob = ''
	education = ''
	sub_users = []
	sub_topics = []
	followers = []
	friends = ''
	bio = ''
	history = {}
	rank = -1


class LabProfile(object):
	name = ''
	location = ''
	publications = []
	researchers = []
	affiliations = []
	founded = ''
	interests = []
