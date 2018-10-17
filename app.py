'''
	app.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

from flask import Flask, render_template, jsonify, session
from profile import LoginForm, SignupForm
from article import CreateArticleForm
from search import SearchForm

app = Flask(__name__)

'''
Home page
'''
@app.route('/')
@app.route('/home')
def home():
	if 'username' in session:
		return 'You are logged in as {}'.format(session['username'])

	return render_template('index.html')


@app.route('/signup')
def signup():
	form = SignupForm(app)
	# return render_template('', form=form)


@app.route('/login', methods=['POST'])
def login():
	form = LoginForm(app)
	
	if form.validate_on_submit():
		pass
	
	# return render_template('', form=form)	


@app.route('/logout')
def logout():
	# return render_template('', form=form)


'''
Search routes
'''
@app.route('/search')
def search():
	form = SearchForm(app)
	form.search(request.args.get('terms'))

	# return render_template('', form=form)


'''
Article routes
'''
@app.route('/article/<id>')
def get_article(id):
	# return render_template('', form=form)


@app.route('/article/<id>/create')
def create_article():
	form = CreateArticleForm(app)
	# return render_template('', form=form)


@app.route('/article/<id>/edit')
def edit_article():
	form = EditArticleForm(app)
	# return render_template('', form=form)


@app.route('/article/<id>/save')
def save_article():
	# return render_template('', form=form)


@app.route('/article/<id>/like')
def like_article():
	# return render_template('', form=form)

'''
Profile routes
'''
@app.route('/profile/<id>')
def get_profile(id):
	# return render_template('', form=form)


@app.route('/profile/<id>/settings')
def get_profile_settings(id):
	# return render_template('', form=form)


@app.route('/profile/<id>/subscribe')
def subscribe(id):
	# return render_template('', form=form)


if __name__ == '__main__':
	app.run()