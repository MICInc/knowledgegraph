import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
		isLoggedIn: false,
		userInfo: {}
  },

  mutations: {
		setAccessToken (state, token) {
			Vue.set(state, 'accessToken', token)
		},

		setIsLoggedIn (state, bool) {
			Vue.set(state, 'isLoggedIn', bool)
		},

		setUserInfo (state, obj) {
			Vue.set(state, 'userInfo', obj)
		},

		setEmail(state, email) {
			state.userInfo.email = email;
		},

		setFirstName(state, name) {
			state.userInfo.first_name = name;
		},

		setLastName(state, name) {
			state.userInfo.last_name = name;
		},

		setSessionID(state, sess) {
			state.userInfo.sess_id = sess;
		},

		setURL(state, url) {
			state.userInfo.url = url;
		}
  },

  actions: {
		
		login ({commit, state}, [access_token, userInfo]) {
			commit('setAccessToken', access_token)
			commit('setUserInfo', userInfo)
			commit('setIsLoggedIn', true)
		},
		
		logout ({commit, state}) {
			commit('setAccessToken', '')
			commit('setUserInfo', {})
			commit('setIsLoggedIn', false)
		},

		set_user_info ({commit, state}, [userInfo]) {
			commit('setUserInfo', userInfo)
		}
	},

	plugins:[
		createPersistedState(),
	],
})
