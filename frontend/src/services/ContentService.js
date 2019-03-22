import Api from '@/services/Api'

export default {
		addContent(data) {
			return Api().post('/content/add', data);
		},
		cleanup(data) {
			return Api().post('/content/cleanup', data);
		},
		saveContent(data) {
			return Api().post('/content', data);
		},
		getContent(data) {
			return Api().get('/content', data);
		},
		getImage(data) {
			return Api().get('/content/img', data);
		},
		uploadFile(uri, data, config) {
			return Api().post(uri, data, config);
		},
		removeContent(index) {
			return Api().post('/content/remove', index);
		},
		upvote(data) {
			return Api().post('/content/upvote', data);
		},
		downvote(data) {
			return Api().post('/content/downvote', data);
		},
		reload(data) {
			return Api().get('/content/reload', data);
		},
		canEdit(data) {
			return Api().get('/content/edit', data);
		}
}