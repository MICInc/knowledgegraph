import Api from '@/services/Api'

export default {
	submitCommunity(data) {
		return Api().post('/community', data);
	},
	getAll() {
		return Api().get('/community');
	},
	getCommunity(community) {
		return Api().get('/community', community);
	}
}