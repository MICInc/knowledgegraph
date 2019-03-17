import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		getProfile(data) {
			return Api().get('/profile', data)
		},
		getLibrary(data) {
			return Api().get('/profile/library', data)
		},
		canEdit(data) {
			return Api().get('/profile/edit', data);
		},
		clearLibrary(data) {
			return Api().post('/profile/library/clear', data)
		},
		getProfilePic(data) {
			return Api().get('/profile/picture', data);
		},
		saveProfile(data) {
			return Api().post('/profile', data);
		},
		uploadProfPic(data) {
			return Api().post('/profile/picture', data);
		},
		get_comments(data) {
			return Api().post('/profile/comments', data);
		}
}