import Api from '@/services/Api'

export default {
		check_date(data) {
			return Api().post('/api/index/date', data);
		},
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
		},
		check_session(data) {
			return Api().post('/api/index/session', data);
		}
}