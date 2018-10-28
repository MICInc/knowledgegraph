
'''
	authors: Justin Chen & Devin de Hueck
	10.21.2018
'''
from flask_login import UserMixin
from library import Library


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
		self.user_id = -1
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
		self.friend_reqs = []
		self.followers = []
		self.affiliations = []
		self.subscription = []
		self.subscribers = []
		self.website = ''
		self.address = ''
		self.profile_pic = ''
		self.cover_photo = ''
		self.bibtex = ''
		self.social_accounts = []
		self.companies = []
		self.favorite_papers = []
		self.research_interests = []
		self.statuses = ''
		self.library = Library(user_id)

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
	Update date of birth

	Input: dob (str) Date formatted as %Y-%m-%d
	'''
	def set_dob(self, dob):
		self.dob = dob


	'''
	Update friends list

	Input: friend (Account) Friend to be added
	'''
	def set_friend(self, friend):
		self.friends.append(friend)


	'''
	Send friend request to this account

	Input: sender (Account) Account making request
	'''
	def send_friend_req(self, sender):
		self.friend_reqs.append(sender)


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


	'''
	Profile statuses

	TODO: Allow users to post dynamic content with images, audio, links, files, etc.

	Input: status (str) user status
	'''
	def post_status(self, status):
		self.statuses.append(status)


	'''
	Update user's favorite papers

	TODO: Allow user to add more dynamic content.

	Input: paper (Paper) Object representing a research paper or article
	'''
	def add_favorite_paper(self, paper):
		self.favorite_papers.append(paper)


	'''
	Upload and replace user's bibtex

	TODO: Logic for sorting different types of publications

	Input: bibtex (dict) Dictionary containing user's work
	'''
	def upload_bibtex(self, bibtex):
		self.bibtex = bibtex


	'''
	Upload account's profile picture
	'''
	def upload_profile_pic(self, pic):
		pass


	'''
	Upload account's cover photo
	'''
	def upload_cover_photo(self, pic):
		pass


class User(Account):
	def __init__(self):
		super().__init__(self)
		self.age = -1
		self.education = ''
		self.gender = ''
		self.ethnicity = ''
		self.occupation = ''


	'''
	Update education

	Input: school (dict) Dictionary contain school information
	'''
	def set_education(self, school):
		self.education = school


	'''
	Update user's gender

	Input: gender (str) User's updated gender
	'''
	def set_gender(self, gender):
		self.gender = gender


	'''
	Update user's ethnicity

	Input: ethnicity (str) User's updated ethnicity
	'''
	def set_ethnicity(self, ethnicity):
		self.ethnicity = ethnicity



class Lab(Account):
	def __init__(self):
		super().__init__(self)


	'''
	Return lab affiliations

	Output: affiliations (list)
	'''
	def get_affiliations(self):
		return self.affiliations

