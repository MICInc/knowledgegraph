import AuthenticationService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	created() {
		AuthenticationService.verify_token({ email: this.email, token: this.token })
		.then((resp) => {
			if(resp.status == 401) {
				console.log('invalid token');
				AuthenticationService.logoutUser(this.$store.state.userInfo);

				this.$store.dispatch('logout')
				.then((resp) => {
					router.push({ name: 'home' })
				})
				.catch((err) => {
					router.push({ name: 'home' })
				});
			}

			if(resp.status == 400) router.push({ name: 'home' })
		})
		.catch((error) => {
		});
	},
	data() {
		return {
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	}
}