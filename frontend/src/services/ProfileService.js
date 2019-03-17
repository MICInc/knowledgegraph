import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		getProfile(data) {
			return Api().get('/profile', data)
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
		follow(data) {
			return Api.post('/profile/follow', data);
		},
		get_comments(data) {
			return Api().get('/profile/comments', data);
		},
		get_library(data) {
			return Api().get('/profile/library', data)
		},
		get_publications(data) {
			return Api().get('/profile/publications', data)
		},
		get_followers(data) {
			return Api().get('/profile/followes', data);
		},
		get_following(data) {
			return Api().get('/profile/following', data);
		}
}