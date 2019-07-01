<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container">
			<form v-on:submit.prevent="handleSubmit">
				<p>{{error}}</p>
				<input type="email" placeholder="Email" v-model="formData.email" autocomplete="username" required>
				<input type="password" placeholder="Password" v-model="formData.password" autocomplete="current-password" required>
				<label>
					<input type="checkbox" checked="checked" name="remember"> Remember me
				</label>
				<button type="submit">Login</button>
				<!-- <span>
					<router-link type="a" to="forgot">Forgot account?</router-link>
				</span> -->
				<!-- <div class="g-signin2" id="google-signin-button"></div> -->
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'login',
	components: {
		PageNav
	},
	data () {
		return {
			formData: {},
			error: ''
		}
	},
	mounted() {
		gapi.signin2.render('google-signin-button', {
			onsuccess: this.onSignIn
		});
	},
	methods: {
		handleSubmit() {
			this.login()
			.then((resp) => {
				this.$store.dispatch('login', [resp.data.token, resp.data.userInfo]);
				router.push({ name: 'home' });
			})
			.catch((error) => {
				if(error.response != null) {
					this.error = error.response.data.error;
					if(error.response.status == 401) router.push({ name: 'verify' });
				}
			});
		},
		async login(email) {
			return await AuthService.login({ email: email });
		},
		onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();

			if(profile) {
				this.login(profile.getEmail())
				.then((resp) => {
					if(resp.data.userInfo.picture.length == 0) resp.data.userInfo.picture = profile.getImageUrl();
					resp.data.userInfo.first_name = profile.getGivenName();
					resp.data.userInfo.last_name = profile.getFamilyName();

					this.$store.dispatch('login', [resp.data.token, resp.data.userInfo]);
					router.push({ name: 'home' });
				})
				.catch((error) => {
					if(error.response != null) {
						this.error = error.response.data.error;
						if(error.response.status == 401) router.push({ name: 'verify' });
					}
				});
			}
			else {
				this.error = error.response.data.error;
				if(error.response.status == 401) router.push({ name: 'verify' });
			}
		}
	}
}
</script>


<style scoped>

.main {
	display: flex;
	flex-direction: column;
}

.container {
	display: flex;
	justify-content: center;
	flex-direction: 
}

.g-signin2 {
	margin: 10 0 0 0px;
	width: 100%;
}

.container form {
	display: flex;
	flex-direction: column;
	width: 300px;
	margin: 80px 0 0 0;
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
	background: transparent;
	color: #502984;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 100%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	border-color: #502984;
}

</style>
