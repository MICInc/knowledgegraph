import Api from '@/services/Api'

export default {
	send(data) {
		return Api().post('/api/conference/feedback', data);
	}
}