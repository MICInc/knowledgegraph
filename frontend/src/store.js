import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
		isLoggedIn: false,
  },

  mutations: {
		setAccessToken (state, token) {
			Vue.set(state, 'accessToken', token)
		},

		setIsLoggedIn (state, bool) {
			Vue.set(state, 'isLoggedIn', bool)
		},
  },

  actions: {
		
		login ({commit, state}, access_token) {
			commit('setAccessToken', access_token)
			commit('setIsLoggedIn', true)
		},
		
		logout ({commit, state}) {
			commit('setAccessToken', '')
			commit('setIsLoggedIn', false)
		},

  }
})
