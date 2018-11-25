import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
			component: () => import('./views/About.vue')
		},
		{
			path: '/add',
			name: 'add-content',
			component: () => import('./views/AddContent.vue')
		},
		{
			path: '/content/:id',
			name: 'content',
			component: () => import('./views/Content.vue')
		},
		{
			path: '/community',
			name: 'community',
			component: () => import('./views/Community.vue')
		},
		{
			path: '/conference',
			name: 'conference',
			component: () => import('./views/Conference.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/Login.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/SignUp.vue')
		}
	]
})
