import Api from '@/services/Api'

export default {
		getArticles() {
			return Api().get('/article/:id')
		},
		createArticle(data) {
			return Api().post('/article', data)
		},
		editArticle() {
			return Api().post('/article/:id')
		}
}