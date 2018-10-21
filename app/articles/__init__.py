'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length


class CreateArticleForm(FlaskForm):
	def __init__(self):
		self.date = ''
		self.author = StringField('author', validators=[InputRequired(), Length(min=4)])
		self.citations = StringField('citations', validators=[InputRequired()])
		self.content = StringField('content', validators=[InputRequired()])
		self.prereqs = StringField('prereqs', validators=[InputRequired()])
		self.references = StringField('references', validators=[InputRequired()])
		self.related = StringField('related', validators=[InputRequired()])
		self.subseqs = StringField('subseqs', validators=[InputRequired()])
		self.title = StringField('title', validators=[InputRequired()])
		self.topic = StringField('topic', validators=[InputRequired()])