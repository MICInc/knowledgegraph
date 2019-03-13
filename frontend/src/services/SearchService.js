import Api from '@/services/Api'

export default {
	search(data) {
		return Api().get('/search', data);
	},
	findSchool(data) {
		return Api().get('/school', data);
	}
}