import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
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
			component: () => import('./views/AddContent.vue')
		},
		{
			path: '/admin',
			name: 'admin-console',
			component: () => import('./views/AdminConsole.vue')
		},
		{
			path: '/content/:id',
			name: 'content',
			component: () => import('./views/Content.vue')
		},
		{
			path: '/content/edit/:id',
			name: 'edit',
			component: () => import('./views/AddContent.vue')
		},
		{
			path: '/community',
			name: 'community',
			component: () => import('./views/Community.vue')
		},
		{
			path: '/community/start',
			name: 'community-reg',
			component: () => import('./views/CommunityReg.vue')
		},
		{
			path: '/conference',
			name: 'conference',
			component: () => import('./views/Conference.vue')
		},
		{
			path: '/mic/mit',
			name: 'mic',
			component: () => import('./views/MIC.vue')
		},
		{
			path: '/archived/conference',
			name: 'oldConference',
			component: () => import('./views/OldConference.vue')
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
			path: '/signup',
			name: 'signup',
			component: () => import('./views/SignUp.vue')
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: () => import('./views/Profile.vue')
		},
		{
			path: '*',
			name: 'notfound',
			component: () => import('./views/NotFound.vue')
		}
	]
})
