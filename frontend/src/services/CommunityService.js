import Api from '@/services/Api'

export default {
	submitCommunity(data) {
		return Api().post('/community', data);
	}
}