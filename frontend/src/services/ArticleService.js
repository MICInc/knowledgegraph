import Api from '@/services/Api'

export default {
		getArticles () {
			return Api().get('/article')
		},

}