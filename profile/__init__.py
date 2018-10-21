'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''

from flask import request, redirect, url_for, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
import bcrypt
from flask_login import UserMixin
from database import UserDB


class LoginForm(FlaskForm):
	def __init__(self):
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.remember = BooleanField('remember me')
		self.username = StringField('username/email', validators=[InputRequired(), Length(min=4, max=30)])


class UserSignupForm(FlaskForm):
	def __init__(self):
		self.bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.dob = StringField('dob', validators=[InputRequired(), Length(min=4, max=30)])
		self.education = StringField('education', validators=[InputRequired(), Length(min=4, max=30)])
		self.email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
		self.ethnicity = StringField('ethnicity', validators=[InputRequired(), Length(min=4, max=30)])
		self.gender = StringField('gender', validators=[InputRequired(), Length(min=4, max=30)])
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class LabSignupForm(FlaskForm):
	def __init__(self):
		self.address = StringField('address', validators=[InputRequired(), Length(min=5)])
		self.bio = StringField('username', validators=[InputRequired(), Length(min=4)])
		self.email = StringField('email', validators=[InputRequired(), Email(message='Invalid email')])
		self.founded = StringField('dob', validators=[InputRequired(), Length(min=6, max=6)])
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.location = StringField('location', validators=[InputRequired(), Length(min=3, max=100)])
		self.name = StringField('name', validators=[InputRequired(), Length(min=3, max=100)])
		self.research = StringField('research', validators=[InputRequired(), Length(min=3)])
		self.researchers = StringField('researchers', validators=[InputRequired()])
		self.website = StringField('website', validators=[InputRequired(), Length(min=3)])


'''
user_type: 0=site_admin, 1=site_moderator, 2=lab_admin, 3=lab_moderator, 4=general
'''
class User(UserMixin):
	def __init__(self):
		self.id = profile.id
		self.email = profile.email
		self.username = profile.username
		self.pw = generate_password_hash(password, method='sha256')
		self.user_type = profile.user_type
		self.dob = profile.dob
		self.bio = profile.bio
		self.age = profile.age
		self.education = profile.education
		self.gender = profile.gender
		self.ethnicity = profile.ethnicity
		self.followers = profile.
		self.friends = []
		self.articles_viewed = 0
		self.active_days = 0
		self.active_time_of_day = 0
		self.subscription = {}
		self.subscription_count = 0
		self.comment_rankings = 0
		self.external_comment_freq = 0
		self.internal_comment_freq = 0
		self.content_count = 0
		self.content_quality = 0
		self.contribution_count = 0
		self.follower_count = 0
		self.profile_view = 0
		self.search_history = 0
		self.rank = -1


	'''
	Update all attributes

	Input: properties (dict) Dict
	'''
	def update(self, properties):
		if not isinstance(properties, dict):
			raise 'TypeError'

		for k, v in properties.items():
			if hasattr(self, k):
				setattr(self, k, v)


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
