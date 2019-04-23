import Api from '@/services/Api'

export default {
		// take a object with an id property identifying the user
		// default id = 0 (not a user or not logged in)
		getProfile(data) {
			return Api().get('/api/profile', data)
		},
		canEdit(data) {
			return Api().get('/api/profile/edit', data);
		},
		getProfilePic(data) {
			return Api().get('/api/profile/picture', data);
		},
		saveProfile(data) {
			return Api().post('/api/profile', data);
		},
		uploadProfPic(data) {
			return Api().post('/api/profile/picture', data);
		},
		follow(data) {
			return Api().post('/api/profile/follow', data);
		},
		get_comments(data) {
			return Api().get('/api/profile/comments', data);
		},
		get_library(data) {
			return Api().get('/api/profile/library', data)
		},
		get_publications(data) {
			return Api().get('/api/profile/publications', data)
		},
		get_followers(data) {
			return Api().get('/api/profile/followers', data);
		},
		get_following(data) {
			return Api().get('/api/profile/following', data);
		},
		update_password(data) {
			return Api().post('/api/profile/update_password', data);
		},
		update_url(data) {
			return Api().post('/api/profile/update_url', data);
		},
		update_first_name(data) {
			return Api().post('/api/profile/update_first_name', data);
		},
		update_last_name(data) {
			return Api().post('/api/profile/update_last_name', data);
		},
		update_email(data) {
			return Api().post('/api/profile/update_email', data);
		},
		deactivate(data) {
			return Api().post('/api/profile/deactivate', data);
		}
}