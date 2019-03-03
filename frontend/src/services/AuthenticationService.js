import Api from '@/services/Api'

export default {

		loginUser (data) {
			return Api().post('/login', data)
		},

		signUpUser (data) {
			return Api().post('/signup', data)
		},

		logoutUser(data) {
			return Api().post('/logout', data)
		},
		forgotLogin(data) {
			return Api().post('/forgot', data)
		}
}