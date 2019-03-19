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
