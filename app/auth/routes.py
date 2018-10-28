from app import api, mongo
from flask import request
from flask_restful import Resource
from .forms import RegisterForm , LoginForm
from .utils import UserUtils
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

db = mongo.db

class Register(Resource):

	def post(self):
		req_body = request.get_json()
		register_form = RegisterForm(csrf_enabled=False)

		if register_form.validate():
			new_user = UserUtils.create_new_user_obj(register_form.data)

			if db.users.find_one({"username": new_user['username']}) is None:
				if db.users.find_one({"email": new_user['email']}) is None:
					user_id = db.users.insert_one(new_user).inserted_id
					# Generate Token
					access_token = create_access_token(identity=str(user_id))
					return {'access_token': access_token}

				else:
					return {'error': 'Email already taken'}

			else:
				return {'error': 'Username already taken'}
		
		else:
			return register_form.errors

class Login(Resource):

	def post(self):
		req_body = request.get_json()
		login_form = LoginForm(csrf_enabled=False)

		if login_form.validate():
			user = db.users.find_one({"username": login_form.username.data})
			
			if user is not None:
				if UserUtils.verify_password(login_form.password.data, user['password_hash']):
					# Generate Token
					access_token = create_access_token(identity=str(user['_id']))
					return {'access_token': access_token}
				
				else:
					return {'error': 'Credentials were incorrect'}
			
			else:
					return {'error': 'User not found'}
		else:
			return register_form.errors


class UserView(Resource):

	@jwt_required
	def get(self):
		current_user = get_jwt_identity()
		return {'current_user_id': current_user}



api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(UserView, '/users/me')
