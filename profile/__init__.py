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


class UserSignupForm(FlaskForm):
	bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
	dob = StringField('dob', validators=[InputRequired(), Length(min=4, max=30)])
	education = StringField('education', validators=[InputRequired(), Length(min=4, max=30)])
	email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
	ethnicity = StringField('ethnicity', validators=[InputRequired(), Length(min=4, max=30)])
	gender = StringField('gender', validators=[InputRequired(), Length(min=4, max=30)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class LabSignupForm(FlaskForm):
	address = StringField('address', validators=[InputRequired(), Length(min=5)])
	bio = StringField('username', validators=[InputRequired(), Length(min=4)])
	email = StringField('email', validators=[InputRequired(), Email(message='Invalid email')])
	founded = StringField('dob', validators=[InputRequired(), Length(min=6, max=6)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	location = StringField('location', validators=[InputRequired(), Length(min=3, max=100)])
	name = StringField('name', validators=[InputRequired(), Length(min=3, max=100)])
	research = StringField('research', validators=[InputRequired(), Length(min=3)])
	researchers = StringField('researchers', validators=[InputRequired()])
	website = StringField('website', validators=[InputRequired(), Length(min=3)])


'''
user_type: 0=site_admin, 1=site_moderator, 2=lab_admin, 3=lab_moderator, 4=general
'''
class User(object):
	def __init__(self, form):
		self.bio = form.bio.data
		self.dob = form.dob.data
		self.education = form.education.data
		self.email = form.email.data
		self.followers = []
		self.friends = []
		self.gender = form.gender.data
		self.history = {}
		self.pw = generate_password_hash(form.password.data, method='sha256')
		self.rank = -1
		self.subscribed_topics = []
		self.subscribed_users = []
		self.username = form.username.data
		self.user_type = 4


class Lab(object):
	def __init__(self, form):
		self.address = form.address.data
		self.affiliations = []
		self.bio = form.bio.data
		self.founded = form.founded.data
		self.email = form.email.data
		self.password = form.password.data
		self.location = form.location.data
		self.name = form.name.data
		self.publications = []
		self.rank = -1
		self.research = form.research.data
		self.researchers = form.researchers.data
		self.website = form.website.data
