
'''
	authors: Justin Chen & Devin de Hueck
	10.21.2018
'''
from flask_login import UserMixin


'''
user_type: 
	-1=no_privilege
	0=site_admin, 
	1=site_moderator, 
	2=lab_admin, 
	3=lab_moderator, 
	4=general
'''
class Account(UserMixin):
	def __init__(self):
		self.id = -1
		self.email = ''
		self.username = ''
		self.pw = ''
		self.user_type = -1
		self.rank = -1


	'''
	Update all attributes

	Input: properties (dict) Dict
	'''
	def update(self, properties):
		if not isinstance(properties, dict):
			raise 'TypeError'

		for k, v in properties.items():
			if hasattr(self, k):
				if v.__module__ == 'wtforms.fields.core':
					v = v.data
				setattr(self, k, v)


class User(Account):
	def __init__(self):
		Account.__init__(self)
		self.dob = ''
		self.bio = ''
		self.age = -1
		self.education = ''
		self.gender = ''
		self.ethnicity = ''
		self.followers = []
		self.friends = []
		self.articles_viewed = 0
		self.active_days = 0
		self.active_time_of_day = 0
		self.subscription = {}
		self.subscription_count = 0
		self.comment_rankings = 0
		self.external_comment_freq = 0
		self.internal_comment_freq = 0
		self.content_count = 0
		self.content_quality = 0
		self.contribution_count = 0
		self.follower_count = 0
		self.profile_view = 0
		self.search_history = 0


class Lab(Account):
	def __init__(self):
		super().__init__(self)
		self.address = ''
		self.affiliations = []
		self.bio = ''
		self.founded = ''
		self.location = ''
		self.name = ''
		self.publications = []
		self.research = ''
		self.researchers = ''
		self.website = ''
