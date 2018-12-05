import Api from '@/services/Api'

export default {
	registerConf(data) {
		return Api().post('/conference', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	}
}