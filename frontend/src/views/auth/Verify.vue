<template>
	<div class="container">
		<PageNav></PageNav>
		<div v-if="verified">
			<h3>Account verified</h3>
			<p>Thanks for verifying your account.</p>
		</div>
		<div v-else class="resubmit">
			<h3>Account could not be verified</h3>
			<p>Resend email verification.</p>
			<form>
				<input type="email" placeholder="Email" v-model="email"><br>
				<button type="submit">Submit</button>
			</form>
		</div>
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
			email: '',
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
		},
		async resend() {
			AuthenticationService.resend_verification({ email: this.email })
			.then((resp) => {
				console.log(resp);
			})
			.catch((error) => {
				console.error(error);
			});
		}
	}
}
</script>

<style scoped>
.resubmit {
	width: 100%;
}

.resubmit form input {
	width: 50%;
}
</style>