<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>Verification page</h3>
		<p v-if="verified">Thanks for verifying your account.</p>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import AuthenticationService from '@/services/AuthenticationService'

export default {
	name: 'verify',
	components: {
		PageNav
	},
	beforeMount() {
		this.verify();
	},
	data() {
		return {
			verified: false
		}
	},
	methods: {
		async verify() {			
			AuthenticationService.verify({ code: this.$route.query.c })
			.then((resp) => {
				if(resp.data != null) {
					this.verified = true;
					this.$store.dispatch('login', [resp.data.token, resp.data.userInfo]);
					router.push({ name: 'home' });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}
}
</script>

<style scoped>
</style>