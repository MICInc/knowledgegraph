import Api from '@/services/Api'

export default {
	am_i_registered(data) {
		return Api().post('/api/conference/am_i_registered', data);
	},
	apply_for_scholarship(data) {
		return Api().post('/api/conference/apply_for_scholarship', data);
	},
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