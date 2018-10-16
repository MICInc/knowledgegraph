'''
	Instructions of installing MongoDB on OSX:
	https://treehouse.github.io/installation-guides/mac/mongo-mac.html
'''
from pymongo import MongoClient

class Database(object):
	def __init__(self, host='localhost', port=27017):
		self.client = MongoClient(host, port)