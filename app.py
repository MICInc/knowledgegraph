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

@app.route('/')
@app.route('/home')
def home():
	data = [
				{'title': 'Neuroevolution of Augmenting Topologies', 'author': 'Kenneth Stanley', 'year': '2002'}, 
				{'title': 'Large Scale Distribute Deep Networks', 'author': 'Jeff Dean', 'year': '2012'},
				{'title': 'Deep Gradient Compression', 'author': 'Yujun Lin', 'year': '2018'}
		   ]
	db = Database()
	db.insert(data)
	return render_template('index.html', papers=data, title='Favorite papers')


@app.route('/search')
def search():
	pass


@app.route('/article')
def article():
	pass


@app.route('/profile')
def profile():
	pass

if __name__ == '__main__':
	app.run()