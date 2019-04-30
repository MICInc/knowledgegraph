import Api from '@/services/Api'

export default {
		addContent(data) {
			return Api().post('/api/content/add', data);
		},
		cleanup(data) {
			return Api().post('/api/content/cleanup', data);
		},
		saveContent(data) {
			return Api().post('/api/content', data);
		},
		getContent(data) {
			return Api().get('/api/content', data);
		},
		getImage(data) {
			return Api().get('/api/content/img', data);
		},
		uploadFile(uri, data, config) {
			return Api().post(uri, data, config);
		},
		removeContent(index) {
			return Api().post('/api/content/remove', index);
		},
		upvote(data) {
			return Api().post('/api/content/upvote', data);
		},
		downvote(data) {
			return Api().post('/api/content/downvote', data);
		},
		reload(data) {
			return Api().get('/api/content/reload', data);
		},
		canEdit(data) {
			return Api().get('/api/content/edit', data);
		},
		report(data) {
			return Api().post('/api/content/report', data);
		}
}