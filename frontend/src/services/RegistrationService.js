import Api from '@/services/Api'

export default {
	register(data) {
		return Api().post('/conference/register', data);
	},
	getRegistrations() {
		return Api().get('/conference/register')
	}
}