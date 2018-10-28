from passlib.apps import custom_app_context as pwd_context


class UserUtils:
    def create_new_user_obj(form_data):
        return {
            "username": form_data['username'],
            "email": form_data['email'],
            "password_hash": UserUtils.hash_password(form_data['password']),
        }
    
    def verify_password(password, password_hash):
        return pwd_context.verify(password, password_hash)

    def hash_password(password):
        return pwd_context.encrypt(password)