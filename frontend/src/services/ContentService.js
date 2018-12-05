import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		getContent(data) {
			return Api().get('/content', data)
		},
		createContent(data) {
			return Api().post('/content', data)
		},
		editContent(data) {
			return Api().post('/content/edit', data)
		}
}