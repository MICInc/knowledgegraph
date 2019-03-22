import Api from '@/services/Api'

export default {
	verify_access_level(data) {
		return Api().post('/admin', data);
	}
}