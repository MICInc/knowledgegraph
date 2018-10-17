'''
	Instructions of installing MongoDB on OSX:
	https://treehouse.github.io/installation-guides/mac/mongo-mac.html

	Todo:
	- Knowledge db
	- User db
	- Community news db
'''
from flask.ext.pymongo import PyMongo


class Database(object):
	def __init__(self, app, host='localhost', port=27017):
		self.mongo = PyMongo(app)


	def search(self, term):
		self.collection.find(term)


	def remove(self, term):
		doc = self.search(term)
		self.collection.delete_one(doc)


class KnowledgeDB(Database):
	def __init__(self, host='localhost', port=27017):
		Database.__init__(self)
		self.collection = self.client.knowledge


	def search(self, data):
		self.search(term)


	def remove(self, term):
		self.remove(term)


class UserDB(Database):
	def __init__(self, host='localhost', port=27017):
		Database.__init__(self)
		self.collection = self.client.user


	def search(self, term):
		self.search(term)


	def remove(self, term):
		self.remove(term)


class CommunityDB(Database):
	def __init__(self, host='localhost', port=27017):
		Database.__init__(self)
		self.collection = self.client.community


	def search(self, term):
		self.search(term)


	def remove(self, term):
		self.remove(term)