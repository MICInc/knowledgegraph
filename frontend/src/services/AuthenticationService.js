import Api from '@/services/Api'

export default {

		loginUser (data) {
			return Api().post('/login', data)
		},

		signUpUser (data) {
			return Api().post('/signup', data)
		},

		logoutUser () {
			return Api().post('/logout')
		},
}