from flask import Flask, render_template, jsonify, session
from profile import LoginForm, UserSignupForm, LabSignupForm
from article import CreateArticleForm
from search import SearchForm
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from profile import User, UserProfile
from database import UserDB


class Router(object):
	def __init__(self, app):
		login_manager = LoginManager()
		user_db = UserDB()


	'''
	Home page
	'''
	@app.route('/')
	@app.route('/home')
	def home():
		if 'username' in session:
			return 'You are logged in as {}'.format(session['username'])

		return render_template('index.html')


	@app.route('/login', methods=['GET', 'POST'])
	def login():
		form = LoginForm()
		username = form.username.data

		if form.validate_on_submit() and user_db.search(username):
			user = User(form.username.data, form.password.data)

			if check_password_hash(user.password, form.password.data):
				login_user(user, remember=form.remember.data)
				return redirect(url_for('dashboard'))

		return 'invalid credentials'


	@app.route('/signup', methods=['POST', 'GET'])
	def signup():
		form = UserSignupForm()

		if form.validate_on_submit():
			db.session.add(UserProfile(form.username.data))
			db.session.commit()
