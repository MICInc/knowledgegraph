'''
'''
import database.Database

class ProfileDB(Database):
	def __init__(self, host='localhost', port=27017):
		Database.__init__(self, host, port)
		self.profiles = self.client.profiles


	'''
	'''
	def create_profile(self, data):
		pass


	'''
	'''
	def delete_profile(self, data):
		pass


	'''
	'''
	def search_profile(self, terms):
		pass