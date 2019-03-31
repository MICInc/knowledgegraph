import Api from '@/services/Api'

export default {
	search(data) {
		return Api().get('/api/search', data);
	},
	findSchool(data) {
		return Api().get('/api/search/school', data);
	}
}