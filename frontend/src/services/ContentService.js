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
		editContent(data) {
			return Api().post('/content/edit', data)
		},
		getPaperInfo(name) {
			// var api = 'http://export.arxiv.org/api/query?search_query=all:1812.03170&start=0&max_results=1';
			// return Api().get(api, );
		},
		uploadFile(uri, data, config) {
			return Api().post(uri, data, config)
		}
}