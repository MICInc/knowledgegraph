'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length


class CreateArticleForm(FlaskForm):
	date = ''
	author = StringField('author', validators=[InputRequired(), Length(min=4)])
	citations = StringField('citations', validators=[InputRequired()])
	content = StringField('content', validators=[InputRequired()])
	prereqs = StringField('prereqs', validators=[InputRequired()])
	references = StringField('references', validators=[InputRequired()])
	related = StringField('related', validators=[InputRequired()])
	subseqs = StringField('subseqs', validators=[InputRequired()])
	title = StringField('title', validators=[InputRequired()])
	topic = StringField('topic', validators=[InputRequired()])