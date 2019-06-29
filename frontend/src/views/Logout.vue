<template>
  <div class="logout">
  	<meta name="google-signin-client_id" content="1064842615025-4homcni5f40jkhq6rr4mursuun7jq7nv.apps.googleusercontent.com">
  </div>
</template>

<script>

import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'logout',
	beforeMount() {
		gapi.load('auth2', () => {
			gapi.auth2.init();
			this.signout();
		});
	},
	methods: {
		signout() {
			gapi.auth2.getAuthInstance().signOut()
			.then((resp) => {
				console.log('User signed out.');
				AuthService.logout(this.$store.state.userInfo);

				this.$store.dispatch('logout').then((response) => {
					console.log('here');
					router.push({ name: 'home' })
				}).catch((err) => {
					router.push({ name: 'home' })
				});
			});
		}
	}
}
</script>