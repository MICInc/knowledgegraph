import Api from '@/services/Api'

export default {
	register(data) {
		return Api().post('/conference/register', data);
		// return Api().post('/conference/register', data, {
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// })
	},
	getRegistrations() {
		return Api().get('/conference/register')
	}
}