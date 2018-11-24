import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		getArticles(data) {
			return Api().get('/article', data)
		},
		createArticle(data) {
			return Api().post('/article', data)
		},
		editArticle(data) {
			return Api().post('/article', data)
		}
}