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


class Form(FlaskForm):
	def __init__(self, app):
		self.db = Database(app)


class LoginForm(Form):
	def __init__(self, app):
		super(Form, self).__init__(app)
		self.users_collection = self.mongo.db.users

		login_user = self.users_collection.find_one({'name': request.form['username']})
		encoded_pw = login_user['password'].encode('utf-8')
		hash_pw = bcrypt.hashpw(request.form['pass'].encode('utf-8'), encoded_pw)
		
		if login_user and hash_pw == encoded_pw:
			session['username'] = request.form['username']
			return redirect(url_for('index'))

		return 'Invalid username/password combination'

		# self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		# self.remember = BooleanField('remember me')
		# self.username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class SignupForm(Form):
	def __init__(self, app):
		super(Form, self).__init__(app)

		if request.method == 'POST':
			users = self.mongo.db.users
			un = request.form['username']
			existing_user = users.find_one({'name': un})

			if existing_user is None:
				hashed_pw = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
				users.insert({'name': un, 'password': hashed_pw})
				session['username'] = un
				return redirect(url_for('index'))

			return '{} already exists'.format(un)


		self.bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.dob = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.education = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.email 	 = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
		self.ethnicity = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.gender = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])


class Profile(object):
	def __init__(self, app):
		self.db = Database(app)


class UserProfile(Profile):
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


class LabProfile(Profile):
	def __init__(self, app):
		super(Profile, self).__init__(app)
		self.affiliations = []
		self.founded = ''
		self.interests = []
		self.location = ''
		self.name = ''
		self.publications = []
		self.researchers = []
