import Api from '@/services/Api'

export default {
	registerConf(data) {
		var headers = {
			'Accept': 'multipart/form-data',
			'Content-Type': 'multipart/form-data',
			'crossdomain': true
		};
		return Api().post('/conference', data, headers);
	}
}