'''
	Instructions of installing MongoDB on OSX:
	https://treehouse.github.io/installation-guides/mac/mongo-mac.html
'''
from pymongo import MongoClient
import json

class Database(object):
	def __init__(self):
		pass


class UserDB(object):
	def __init__(self, host='localhost', port=27017):
		self.collection = MongoClient(host, port).user


	def insert(self, data):
		self.collection.insert_one(json.dumps(data.__dict__))


	def find(self, query):
		results = self.collection.find(query)
		print(results)


	def remove(self, data):
		doc = self.find(data)
		print(doc)
		print(self.collection.delete_one(doc))