'''
	app.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

from flask import Flask, render_template, jsonify, session
from forms import LoginForm, SignupForm, CreateArticleForm

app = Flask(__name__)
mongo = PyMongo

'''
Home page
'''
@app.route('/')
@app.route('/home')
def home():
	return render_template('index.html')


@app.route('signup')
def signup():
	form = SignupForm()
	return


@app.route('/login')
def login():
	form = LoginForm()
	
	if form.validate_on_submit():
		pass
	
	return	


@app.route('/logout')
def logout():
	return 


'''
Search routes
'''
@app.route('/search')
def search():
	form = SearchForm()
	form.search(request.args.get('terms'))

	return


'''
Article routes
'''
@app.route('/article/<id>')
def get_article(id):
	pass


@app.route('/article/<id>/create')
def create_article():
	form = CreateArticleForm()
	return


@app.route('/article/<id>/edit')
def edit_article():
	form = EditArticleForm()
	return


@app.route('/article/<id>/save')
def save_article():
	return


@app.route('/article/<id>/like')
def like_article():
	return

'''
Profile routes
'''
@app.route('/profile/<id>')
def get_profile(id):
	pass


@app.route('/profile/<id>/settings')
def get_profile_settings(id):
	pass


@app.route('/profile/<id>/subscribe')
def subscribe(id):
	pass


if __name__ == '__main__':
	app.run()