import Api from '@/services/Api'

export default {
		check_date(data) {
			return Api().post('/api/index/date', data);
		},
		login(data) {
			return Api().post('/api/index/login', data)
		},
		sign_up(data) {
			return Api().post('/api/index/signup', data)
		},
		logout(data) {
			return Api().post('/api/index/logout', data)
		},
		retrieve_login(data) {
			return Api().post('/api/index/retrieve_login', data)
		},
		check_session(data) {
			return Api().post('/api/index/session', data);
		},
		verify_email(data) {
			return Api().post('/api/index/verify_email', data);
		},
		resend_verification(data) {
			return Api().post('/api/index/resend_verify', data);
		},
		verify_token(data) {
			return Api().post('/api/index/verify_token', data);
		}
}