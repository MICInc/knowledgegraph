<template>
  <div class="logout">
  </div>
</template>

<script>

import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'logout',
	beforeMount() {
		AuthService.logout(this.$store.state.userInfo);

		this.$store.dispatch('logout').then((response) => {
			console.log('here');
			router.push({ name: 'home' })
		}).catch((err) => {
			router.push({ name: 'home' })
		});
		// gapi.load('auth2', () => {
		// 	// console.log('');
		// 	// gapi.auth2.init();
		// 	console.log(gapi == null)
		// 	console.log(gapi.auth2)
		// 	console.log(gapi.auth2.getAuthInstance == null)

		// 	gapi.auth2.getAuthInstance.signOut()
		// 	.then((resp) => {
		// 		console.log('User signed out.');
		// 		AuthService.logout(this.$store.state.userInfo);

		// 		this.$store.dispatch('logout').then((response) => {
		// 			console.log('here');
		// 			router.push({ name: 'home' })
		// 		}).catch((err) => {
		// 			router.push({ name: 'home' })
		// 		});
		// 	});
		// });
	},
	methods: {
		// signout() {
		// 	gapi.auth2.getAuthInstance().signOut()
		// 	.then((resp) => {
		// 		console.log('User signed out.');
		// 		AuthService.logout(this.$store.state.userInfo);

		// 		this.$store.dispatch('logout').then((response) => {
		// 			console.log('here');
		// 			router.push({ name: 'home' })
		// 		}).catch((err) => {
		// 			router.push({ name: 'home' })
		// 		});
		// 	});
		// }
	}
}
</script>