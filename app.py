'''
	app.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

from flask import Flask, render_template, jsonify, session
from forms import LoginForm, SignupForm, CreateArticleForm

app = Flask(__name__)
mongo = PyMongo

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


@app.route('/search')
def search():
	form = SearchForm()
	form.search(request.args.get('terms'))

	return


@app.route('/create')
def create_article():
	form = CreateArticleForm()
	return


if __name__ == '__main__':
	app.run()