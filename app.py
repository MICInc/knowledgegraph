'''
	server.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

import os
from flask import Flask, render_template
from urllib.request import urlopen
from database import Database

app = Flask(__name__)

data = [
		{'title': 'Neuroevolution of Augmenting Topologies', 'author': 'Kenneth Stanley', 'year': '2002'}, 
		{'title': 'Large Scale Distribute Deep Networks', 'author': 'Jeff Dean', 'year': '2012'},
		{'title': 'Deep Gradient Compression', 'author': 'Yujun Lin', 'year': '2018'}
]

@app.route('/')
@app.route('/home')
def home():
	db = Database()
	db.insert(data)
	return render_template('index.html', papers=data, title='MIC')


@app.route('/search')
def search():
	return render_template('search.html', papers=data, title='Search')


@app.route('/article/<id>')
def article(id):
	return render_template('article.html', papers=data, title='id')


@app.route('/profile')
def profile():
	return render_template('profile.html', papers=data, title='Profile')

if __name__ == '__main__':
	app.run()