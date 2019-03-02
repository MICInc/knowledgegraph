import Vue from 'vue'
import Router from 'vue-router'
import OldConference from './views/OldConference.vue'
import store from '@/store'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: OldConference,
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/About.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/add',
			name: 'add-content',
			component: () => import('./views/AddContent.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/admin',
			name: 'admin-console',
			component: () => import('./views/AdminConsole.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/content/:id',
			name: 'content',
			component: () => import('./views/Content.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		// {
		// 	path: '/content/:id/edit',
		// 	name: 'edit',
		// 	component: () => import('./views/AddContent.vue')
		// },
		{
			path: '/community',
			name: 'community',
			component: () => import('./views/Community.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/community/start',
			name: 'community-reg',
			component: () => import('./views/CommunityReg.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/conference',
			name: 'conference',
			component: () => import('./views/Conference.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/archived/conference',
			name: 'oldConference',
			component: () => import('./views/OldConference.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/Login.vue')
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('./views/Logout.vue')
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('./views/Search.vue'),
			beforeEnter: (to, from, next) => { //remove this protected route in production May 31t, 2019
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/SignUp.vue'),
			// beforeEnter: (to, from, next) => {
			// 	if (store.state.isLoggedIn) {
			// 		next()
			// 	} else {
			// 		next({
			// 			name: 'login',
			// 			params: { error: 'You need to log in to access this route.' },
			// 		})
			// 	}
			// }
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('./views/Profile.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		},
		{
			path: '*',
			name: 'notfound',
			component: () => import('./views/NotFound.vue'),
			beforeEnter: (to, from, next) => {
				if (store.state.isLoggedIn) {
					next()
				} else {
					next({
						name: 'login',
						params: { error: 'You need to log in to access this route.' },
					})
				}
			}
		}
	]
})
