from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length

class LoginForm(FlaskForm):
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	username = StringField('username/email', validators=[InputRequired(), Length(min=4, max=30)])


class RegisterForm(FlaskForm):
	email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
	password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
	username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])