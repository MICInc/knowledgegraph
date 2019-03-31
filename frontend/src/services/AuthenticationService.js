import Api from '@/services/Api'

export default {

		loginUser (data) {
			return Api().post('/api/login', data)
		},

		signUpUser (data) {
			return Api().post('/api/signup', data)
		},

		logoutUser(data) {
			return Api().post('/api/logout', data)
		},
		forgotLogin(data) {
			return Api().post('/api/forgot', data)
		}
}