'''
	server.py
	authors: Justin Chen & Devin de Hueck
	date: 10.14.2018
'''

import os
from flask import Flask, render_template, request, jsonify
from urllib.request import urlopen
from database import Database

app = Flask(__name__)
db = Database()

data = [ {'title': 'title', 'author': 'Me', 'year': '2018'}]

@app.route('/')
@app.route('/home')
def home():
	return render_template('index.html', papers=data, title='MIC')


@app.route('/login', methods=['GET', 'POST'])
def login():
	return
	

@app.route('/logout')
def logout():
	return


@app.route('/search')
def search():
	return jsonify(db.search(request.args.get('terms')))


@app.route('/create')
def create_article():
	data=[{"title" : "Deep Gradient Compression", "author" : "Yujun Lin", "year" : "2018" },
		  {"title" : "Neuroevolution of Augmenting Topologies", "author" : "Kenneth Stanley", "year" : "2002" },
		  {"title" : "Large Scale Distribute Deep Networks", "author" : "Jeff Dean", "year" : "2012" }]
	return db.create_article(data)


if __name__ == '__main__':
	app.run()