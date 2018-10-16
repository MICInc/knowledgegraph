'''
'''

from database import ProfileDB

class Profile(object):
	def __init__(self, email, pw):
		self.db = ProfileDB
		self.email = email
		self.pw = pw
		self.gender = ''
		self.dob = ''
		self.ethnicity = ''
		self.education = ''
		self.sub_users = []
		self.sub_topics = []
		self.followers = []
		self.friends = ''
		self.bio = ''
		self.history = {}
		self.rank = -1


	'''
	'''
	def update_email(self, email):
		self.email = email
		self.db.insert


	'''
	'''
	def update_password(self, pw):
		pass


	'''
	'''
	def update_gender(self, gender):
		pass


	'''
	'''
	def update_dob(self, dob):
		pass


	'''
	'''
	def update_ethnicity(self, ethnicity):
		pass


	'''
	'''
	def update_education(self, education):
		pass


	'''
	'''
	def remove_follower(self, user):
		pass


	'''
	'''
	def subscribe_topic(self, user):
		pass


	'''
	'''
	def add_friend(self, user):
		pass


	'''
	'''
	def remove_friend(self, user):
		pass


	'''
	'''
	def update_bio(self, info):
		pass


	'''
	'''
	def update_search_history(self, history):
		pass


	'''
	'''
	def update_rank(self, rank):
		pass


