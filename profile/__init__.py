'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from database import Database
db = Database()


class LoginForm(FlaskForm):
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	remember = BooleanField('remember me')
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class SignupForm(FlaskForm):
	bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	dob = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	education = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	email 	 = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
	ethnicity = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	gender = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])



class UserProfile(object):
	bio = ''
	dob = ''
	education = ''
	email = ''
	followers = []
	friends = ''
	gender = ''
	history = {}
	pw = ''
	rank = -1
	sub_topics = []
	sub_users = []
	username = ''
	user_type = 'lab_admin'


class LabProfile(object):
	affiliations = []
	founded = ''
	interests = []
	location = ''
	name = ''
	publications = []
	researchers = []
