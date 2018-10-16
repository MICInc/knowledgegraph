'''
	knowledge.py
'''
import database.Database

class KnowledgeDB(Database):
	def __init__(self, host='localhost', port=27017):
		Database.__init__(self, host, port)
		self.knowledge = self.client.knowledge


	'''
	'''
	def create_article(self, data):
		collection = self.knowledge.articles
		return collection.insert(data)


	'''
	'''
	def search_article(self, terms):
		collection = self.knowledge.articles
		articles = collection.find({})
		return articles


	'''
	'''
	def update_article()