import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		saveContent(data) {
			return Api().post('/content', data)
		},
		getContent(data) {
			return Api().get('/content', data)
		},
		getImage(data) {
			return Api().get('/content/img', data)
		},
		uploadFile(uri, data, config) {
			return Api().post(uri, data, config)
		},
		removeContent(index) {
			return Api().post('/content/remove', index);
		}
}