import Api from '@/services/Api'

export default {
	submitCommunity(data) {
		return Api().post('/community', data);
	},
	getPage(community) {
		return Api().get('/community', community);
	}
}