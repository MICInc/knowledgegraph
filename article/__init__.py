'''
	authors: Justin Chen & Devin de Hueck
	date: 10.16.2018
'''
from flash_wtf import FlaskForm


class CreateArticleForm(FlaskForm):
	date = ''
	title = StringField('title', validators=[InputRequired()])
	author = StringField('author', validators=[InputRequired(), Length(min=4)])
	content = StringField('content', validators=[InputRequired()])
	prereqs = StringField('prereqs', validators=[InputRequired()])
	subseqs = StringField('subseqs', validators=[InputRequired()])
	related = StringField('related', validators=[InputRequired()])
	topic = StringField('topic', validators=[InputRequired()])
	references = StringField('references', validators=[InputRequired()])
	citations = StringField('citations', validators=[InputRequired()])