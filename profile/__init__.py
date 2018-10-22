
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
		self.user_type = -1
		self.email = ''
		self.email_viewable = True
		self.username = ''
		self.name = ''
		self.pw = ''
		self.dob = ''
		self.bio = ''
		self.location = ''
		self.content = []
		self.friends = []
		self.followers = []
		self.affiliations = []
		self.subscription = []
		self.subscribers = []
		self.website = ''
		self.address = ''

		# Metrics
		self.articles_viewed = 0
		self.active_days = 0
		self.active_time_of_day = 0
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


	'''
	Update account description

	Input: description (str) Account description
	'''
	def set_bio(self, description):
		self.bio = description


	'''
	Get account followers

	Output: followers (list) List of account followers
	'''
	def get_followers(self):
		return self.followers


	'''
	Callable API for submitting a follow request

	Input: follower (dict) Dictionary representing an account
	'''
	def req_follower(self, follower):
		follower.approved = False
		self.followers.append(follower)


	'''
	Return account's subscriptions
	TODO:
	Make subscriptions viewable or hidden
	'''
	def get_subscriptions(self):
		return self.subscriptions


	'''
	Return account's original content

	TODO:
	Make content viewable or hidden
	'''
	def get_content(self):
		return self.content


	'''
	Return account's contributions

	TODO:
	Allow contributions to be anonymous
	'''
	def get_contributions(self):
		return self.contributions


	'''
	Hide account's email

	Input:  hide  (bool) Flag indicating email visibility preference
	'''
	def hide_email(self, hide):
		self.email_viewable = hide


	'''
	Update account email

	Input: email (str) New email address
	'''
	def update_email(self, email):
		self.email = email


class User(Account):
	def __init__(self):
		super().__init__(self)
		self.age = -1
		self.education = ''
		self.gender = ''
		self.ethnicity = ''
		self.occupation = ''


class Lab(Account):
	def __init__(self):
		super().__init__(self)

