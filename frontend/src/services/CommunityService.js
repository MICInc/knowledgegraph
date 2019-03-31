import Api from '@/services/Api'

export default {
	submitCommunity(data) {
		return Api().post('/api/community', data);
	},
	getAll() {
		return Api().get('/api/community');
	},
	getCommunity(community) {
		return Api().get('/api/community', community);
	}
}