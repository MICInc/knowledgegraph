import Api from '@/services/Api'

export default {
	send(data) {
		return Api().post('/conference/feedback', data);
	}
}