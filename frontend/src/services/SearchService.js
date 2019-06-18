import Api from '@/services/Api'

export default {
	search(data) {
		return Api().get('/api/search', data);
	},
	find_school(data) {
		return Api().get('/api/search/school', data);
	},
	find_node(data) {
		return Api().get('/api/search/node', data);
	}
}