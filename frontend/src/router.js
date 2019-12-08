import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: '',
			component: () => import('./views/OldConf.vue')
		},
		// {
		// 	path: '/home',
		// 	name: 'home',
		// 	component: () => import('./views/Home.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		{
			path: '/about/data',
			name: 'data',
			component: () => import('./views/about/Data.vue')
		},
		{
			path: '/about/privacy',
			name: 'privacy',
			component: () => import('./views/about/Privacy.vue')
		},
		{
			path: '/about/terms',
			name: 'terms',
			component: () => import('./views/about/Terms.vue')
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('./views/about/About.vue')
		},
		// {
		// 	path: '/add',
		// 	name: 'add-content',
		// 	component: () => import('./views/AddContent.vue'),
		// 	children: [
		// 		{
		// 			path: ':id/edit',
		// 			component: () => import('./views/AddContent.vue')
		// 		}
		// 	],
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/admin',
		// 	name: 'admin-console',
		// 	component: () => import('./views/AdminConsole.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/content/:id',
		// 	name: 'content',
		// 	component: () => import('./views/Content.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/community',
		// 	name: 'community',
		// 	component: () => import('./views/Community.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/community/start',
		// 	name: 'community-reg',
		// 	component: () => import('./views/CommunityReg.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		{
			path: '/conference',
			name: 'conference',
			component: () => import('./views/Conference.vue'),
			children: [
				{
					path: 'feedback',
					component: () => import('@/components/conference/Feedback.vue')
				},
				{
					path: 'register',
					// component: () => import('@/components/conference/Registration.vue')
					redirect: '/conference'
				},
				{
					// refactor this later to use dynamic routes. Will need to save the schedule data in backend and load beforeMount()
					path: 'schedule',
					component: () => import('@/components/conference/Schedule.vue'),
					children: [
						{
							path: '2018',
							name: 'schedule2018',
							component: () => import('@/components/conference/schedule/Schedule2018.vue')
						},
						{
							path: '2019',
							name: 'schedule2019',
							component: () => import('@/components/conference/schedule/Schedule2019.vue')
						},
						{
							path: '2020',
							name: 'schedule2020',
							component: () => import('@/components/conference/schedule/Schedule2020.vue')
						}
					]
				},
				{
					path: 'scholarship',
					component: () => import('@/components/conference/Scholarship.vue'),
				},
				{
					path: 'scholars',
					component: () => import('@/components/conference/Scholars.vue'),
				},
				{
					path: 'faq',
					component: () => import('@/components/conference/ScholarshipFAQ.vue')
				},
				{
					path: 'speakers',
					component: () => import('@/components/conference/Speaker.vue'),
					children: [
						{
							path: '2018/:id',
							name: 'speakers2018',
							component: () => import('@/components/conference/speakers/Speakers2018.vue')
						},
						{
							path: '2019/:id',
							name: 'speakers2019',
							component: () => import('@/components/conference/speakers/Speakers2019.vue')
						}
					]
				}
			]
		},
		// {
		// 	path: '/forgot',
		// 	name: 'forgot',
		// 	component: () => import('./views/Forgot.vue')
		// },
		{
			path: '/login',
			name: 'login',
			// component: () => import('./views/Login.vue'),
			redirect: '/'
		},
		// {
		// 	path: '/logout',
		// 	name: 'logout',
		// 	component: () => import('./views/Logout.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/search',
		// 	name: 'search',
		// 	component: () => import('./views/Search.vue'),
		// 	beforeEnter: (to, from, next) => { //remove this protected route in production May 31st, 2019
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/settings',
		// 	name: 'settings',
		// 	component: () => import('./views/Setting.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' }
		// 			})
		// 		}
		// 	}
		// },
		// {
		// 	path: '/signup',
		// 	name: 'signup',
		// 	component: () => import('./views/SignUp.vue')
		// },
		// {
		// 	path: '/verify',
		// 	name: 'verify',
		// 	component: () => import('./views/auth/Verify.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) next({ name: 'home' })
		// 		next()
		// 	}
		// },
		// {
		// 	path: '/:id',
		// 	name: 'profile',
		// 	component: () => import('./views/Profile.vue'),
		// 	beforeEnter: (to, from, next) => {
		// 		if (store.state.isLoggedIn) {
		// 			next()
		// 		} else {
		// 			next({
		// 				name: 'login',
		// 				params: { error: 'You need to log in to access this route.' },
		// 			})
		// 		}
		// 	},
		// 	children: [
		// 		{
		// 			path: 'comments',
		// 			component: () => import('@/components/profile/Comments.vue')
		// 		},
		// 		{
		// 			path: 'followers',
		// 			component: () => import('@/components/profile/Followers.vue')
		// 		},
		// 		{
		// 			path: 'following',
		// 			component: () => import('@/components/profile/Following.vue')
		// 		},
		// 		{
		// 			path: 'library',
		// 			component: () => import('@/components/profile/Library.vue')
		// 		},
		// 		{
		// 			path: 'publications',
		// 			component: () => import('@/components/profile/Publications.vue')
		// 		}
		// 	],
		// 	// props: true
		// },
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
