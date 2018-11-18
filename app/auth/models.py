from passlib.apps import custom_app_context as pwd_context


class UserSchema:
    def __init__(self, form_data):
    def create_obj(form_data):
        return {
            "username": form_data['username'],
            "email": form_data['email'],
            "password_hash": UserUtils.hash_password(form_data['password']),
        }
    
    def verify_password(password, password_hash):
        return pwd_context.verify(password, password_hash)

    def hash_password(password):
        return pwd_context.encrypt(password)