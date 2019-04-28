export default {
	created() {
		AuthenticationService.verify_token({ email: this.$store.state.userInfo.email, token: this.$store.state.accessToken })
			.then((resp) => {
			})
			.catch((error) => {
				AuthenticationService.logoutUser(this.$store.state.userInfo);

				this.$store.dispatch('logout')
				.then((resp) => {
					router.push({ name: 'home' })
				})
				.catch((err) => {
					router.push({ name: 'home' })
				})
		});
	}
}