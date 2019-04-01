import Api from '@/services/Api'

export default {

		loginUser (data) {
			return Api().post('/api/index/login', data)
		},

		signUpUser (data) {
			return Api().post('/api/index/signup', data)
		},

		logoutUser(data) {
			return Api().post('/api/index/logout', data)
		},
		forgotLogin(data) {
			return Api().post('/api/index/forgot', data)
		}
}