import os
from flask import Flask, render_template
from urllib.request import urlopen
from db.db import Database

# url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=1'
# data = urlopen(url).read()
# print(data)


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

if __name__ == '__main__':
	app.run()