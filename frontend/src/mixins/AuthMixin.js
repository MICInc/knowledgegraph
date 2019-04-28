import AuthenticationService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	created() {
		AuthenticationService.verify_token({ email: this.email, token: this.token })
		.then((resp) => {
		})
		.catch((error) => {
			if(error.response.status == 401) {
				AuthenticationService.logoutUser(this.$store.state.userInfo);

				this.$store.dispatch('logout')
				.then((resp) => {
					router.push({ name: 'home' })
				})
				.catch((err) => {
					router.push({ name: 'home' })
				});
			}
		});
	},
	data() {
		return {
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	}
}