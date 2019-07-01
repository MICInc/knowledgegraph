import Api from '@/services/Api'

export default {
	register(data) {
		return Api().post('/api/conference/register', data);
	},
	getRegistrations() {
		return Api().get('/api/conference/register')
	},
	submit_scholarship(data) {
		return Api().post('/api/conference/scholarship', data);
	}
}