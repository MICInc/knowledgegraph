class LoginForm(FlaskForm):
	def __init__(self):
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.remember = BooleanField('remember me')
		self.username = StringField('username/email', validators=[InputRequired(), Length(min=4, max=30)])


class UserSignupForm(FlaskForm):
	def __init__(self):
		self.bio = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])
		self.dob = StringField('dob', validators=[InputRequired(), Length(min=4, max=30)])
		self.education = StringField('education', validators=[InputRequired(), Length(min=4, max=30)])
		self.email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
		self.ethnicity = StringField('ethnicity', validators=[InputRequired(), Length(min=4, max=30)])
		self.gender = StringField('gender', validators=[InputRequired(), Length(min=4, max=30)])
		self.password = PasswordField('password', validators=[InputRequired(), Length(min=10, max=80)])
		self.username = StringField('username', validators=[InputRequired(), Length(min=4, max=30)])