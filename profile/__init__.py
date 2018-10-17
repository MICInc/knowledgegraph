'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask import request, redirect, url_for, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from database import Database
import bcrypt
from flask_login import UserMixin


class LoginForm(FlaskForm):
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	remember = BooleanField('remember me')
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class SignupForm(FlaskForm):
	bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	dob = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	education = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
	ethnicity = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	gender = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class Profile(object):
	def __init__(self, app):
		self.db = Database(app)


class User(Profile):
	def __init__(self, app):
		super(Profile, self).__init__(app)
		self.bio = ''
		self.dob = ''
		self.education = ''
		self.email = ''
		self.followers = []
		self.friends = ''
		self.gender = ''
		self.history = {}
		self.pw = ''
		self.rank = -1
		self.sub_topics = []
		self.sub_users = []
		self.username = ''
		self.user_type = 'lab_admin'


class Lab(Profile):
	def __init__(self, app):
		super(Profile, self).__init__(app)
		self.affiliations = []
		self.founded = ''
		self.interests = []
		self.location = ''
		self.name = ''
		self.publications = []
		self.researchers = []
