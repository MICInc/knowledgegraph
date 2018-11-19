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
			path: '/conference',
			name: 'conference',
			component: () => import('./views/Conference.vue')
		},
		{
			path: '/community',
			name: 'community',
			component: () => import('./views/Community.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			component: () => import('./views/SignUp.vue')
		},
		{
			path: '/article/:id',
			name: 'article',
			component: () => import('./views/Article.vue')
		},
		{
			path: '/add',
			name: 'add-article',
			component: () => import('./views/AddArticle.vue')
		},
	]
})
