<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="body-verify">
			<div v-if="verified">
				<h3>Account verified</h3>
				<p>Thanks for verifying your account.</p>
			</div>
			<div v-else class="resubmit">
				<h3>Account could not be verified</h3>
				<div v-if="!sent">
					<form v-on:submit.prevent="resend">
						<input type="email" placeholder="Email" v-model="email"><br>
						<button type="submit">Resend verifcation</button>
					</form>
				</div>
				<div v-else>
					<p>Email verification sent!</p>
				</div>
			</div>
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
			verified: false,
			sent: false
		}
	},
	methods: {
		async verify() {			
			AuthenticationService.verify_email({ code: this.$route.query.c })
			.then((resp) => {
				if(resp.data != null) {
					this.verified = true;
					this.$store.dispatch('login', [resp.data.token, resp.data.userInfo]);
					router.push({ name: 'non-beta' });
				}
				else {
					AuthenticationService.logoutUser(this.$store.state.userInfo);
		
					this.$store.dispatch('logout')
					.then((resp) => {
					})
					.catch((err) => {
					});
				}
			})
			.catch((error) => {
				this.verified = false;
			});
		},
		async resend() {
			AuthenticationService.resend_verification({ email: this.email })
			.then((resp) => {
				this.sent = true;
			})
			.catch((error) => {
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

.main {
	display: flex;
	flex-direction: column;
}

.body-verify {
	margin: auto;
	display: flex;
	justify-content: center;
	display: flex;
	flex-direction: column;
	width: 300px;
}

input {
	margin: 5px 0;
	padding: 5px;
	border: none;
}

label, a {
	font-size: 12px;
}

.input-row {
	display: flex;
	align-items: center;
}

button {
	width: 100%;
	height: 40px;
}

</style>