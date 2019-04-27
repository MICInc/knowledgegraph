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
				<span>
					<router-link type="a" to="forgot">Forgot account?</router-link>
				</span>
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
	methods: {
		handleSubmit() {
			this.loginUser()
			.then((response) => {
				if (response.data.error != undefined) this.error = response.data.error;
				else { 
					this.$store.dispatch('login', [response.data.token, response.data.userInfo]);
					router.push({ name: 'home' });				
				}
			})
			.catch((error) => {
				console.error(error);
			});
		},
		async loginUser() {
			return await AuthService.loginUser({
				email: this.formData.email, 
				password: this.formData.password
			})
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

form {
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
