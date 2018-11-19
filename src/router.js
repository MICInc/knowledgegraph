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
			path: '/signup',
			name: 'signup',
			component: () => import('./views/SignUp.vue')
		},
		{
			path: '/kg/2018-battaglia-relational',
			name: 'knowledge',
			component: () => import('./views/Knowledge.vue')
		},
		{
			path: '/kg/2018-zaheer-deep',
			name: 'deepsets',
			component: () => import('./views/DeepSets.vue')
		},
	]
})
