'''
	app.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

from flask import Flask, render_template, jsonify, session
from profile import LoginForm, SignupForm
from article import CreateArticleForm
from search import SearchForm
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
login_manager = LoginManager()

'''
Home page
'''
@app.route('/')
@app.route('/home')
def home():
	if 'username' in session:
		return 'You are logged in as {}'.format(session['username'])

	return render_template('index.html')


@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))


@app.route('/login', methods=['GET', 'POST'])
def login():
	print('here1')
	form = LoginForm()
	
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.username.data).first()

		if user:
			if check_password_hash(user.password, form.password.data):
				login_user(user, remember=form.remember.data)
				return redirect(url_for('dashboard'))

		return 'invalid credentials'


@app.route('/signup', methods=['POST', 'GET'])
def signup():
	form = UserSignupForm(app)

	if form.validate_on_submit():
		new_user = User(form)
		db.session.add(new_user)
		db.session.commit()


@app.route('/logout')
@login_required
def logout():
	logout_user()
	return redirect(url_for('index'))


'''
Search routes
'''
@app.route('/search')
def search():
	form = SearchForm(app)
	form.search(request.args.get('terms'))


'''
Article routes
'''
@app.route('/article/<id>')
def get_article(id):
	pass


@app.route('/article/<id>/create')
@login_required
def create_article():
	form = CreateArticleForm(app)


@app.route('/article/<id>/edit')
@login_required
def edit_article():
	form = EditArticleForm(app)


@app.route('/article/<id>/save')
@login_required
def save_article():
	pass


@app.route('/article/<id>/like')
@login_required
def like_article():
	pass


'''
Profile routes
'''
@app.route('/profile/<id>')
@login_required
def get_profile(id):
	pass


@app.route('/profile/<id>/settings')
@login_required
def get_profile_settings(id):
	pass


@app.route('/profile/<id>/subscribe')
@login_required
def subscribe(id):
	pass


if __name__ == '__main__':
	app.run()