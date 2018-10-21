'''
	app.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

from flask import Flask, render_template, jsonify, session
from profile import LoginForm, UserSignupForm, LabSignupForm
from article import CreateArticleForm
from search import SearchForm
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from profile import User, UserProfile
from database import UserDB

app = Flask(__name__)
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

	if form.validate_on_submit():
		username = form.username.data
		entered_pw = form.password.data
		user = User()
		user.update(user_db.find(username))

		if check_password_hash(user.password, entered_pw):
			login_user(user, remember=form.remember.data)
			return redirect(url_for('dashboard'))

	return 'invalid credentials'


@app.route('/signup', methods=['POST', 'GET'])
def signup():
	form = UserSignupForm()

	if form.validate_on_submit():
		user = User()
		user.update(form)
		db.session.add(user)
		db.session.commit()


# @app.route('/logout')
# @login_required
# def logout():
# 	logout_user()
# 	return redirect(url_for('index'))


# '''
# Search routes
# '''
# @app.route('/search')
# def search():
# 	form = SearchForm(app)
# 	form.search(request.args.get('terms'))


# '''
# Article routes
# '''
# @app.route('/article/<id>')
# def get_article(id):
# 	pass


# @app.route('/article/<id>/create')
# @login_required
# def create_article():
# 	form = CreateArticleForm(app)


# @app.route('/article/<id>/edit')
# @login_required
# def edit_article():
# 	form = EditArticleForm(app)


# @app.route('/article/<id>/save')
# @login_required
# def save_article():
# 	pass


# @app.route('/article/<id>/like')
# @login_required
# def like_article():
# 	pass


# '''
# Profile routes
# '''
# @app.route('/user/<username>')
# @login_required
# def user(username):
# 	profile = UserProfile(username)


# @app.route('/user/<id>/settings')
# @login_required
# def get_profile_settings(id):
# 	pass


# @app.route('/user/<id>/subscribe')
# @login_required
# def subscribe(id):
# 	pass

if __name__ == '__main__':
	app.run()