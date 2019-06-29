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
		// logout of the backend node app
		AuthService.logout(this.$store.state.userInfo);

		// logout of the vue app
		this.$store.dispatch('logout');
	},
	mounted() {
		// logout of google oauth
		gapi.load('auth2', (resp) => {
			gapi.auth2.init({
				client_id: '1064842615025-4homcni5f40jkhq6rr4mursuun7jq7nv.apps.googleusercontent.com'
			}).then(function (authInstance) {
				var auth2 = gapi.auth2.getAuthInstance();

				auth2.signOut().then((resp) => {
					router.push({ name: 'home' });
				});
			});
		});
	}
}
</script>