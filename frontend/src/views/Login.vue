<template>
	<div class="login main">
		<PageNav></PageNav>
		<div class="container">
			<form v-on:submit.prevent="handleSubmit">
				<p>{{error}}</p>
				<input type="email" placeholder="Email" v-model="formData.email" required>
				<input type="password" placeholder="Password" v-model="formData.password" required>
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
import PageNav from '@/components/PageNav.vue'
import LinkedContent from '@/components/LinkedContent.vue'
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
			this.loginUser().then((response) => {
				if (response.data.error != undefined && response.status == 200) {
					this.error = response.data.error

				} else if (response.status == 200) {
					this.$store.dispatch('login', [response.data.token, response.data.userInfo])
					router.push({ name: 'home' })
									
				} else {
					alert("Something went wrong.")
					console.log(response)
				}
			});
		},

		async loginUser() {
			return await AuthService.loginUser({
				email: this.formData.email, 
				password: this.formData.password
			})
		},
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
	background: #535353;
}

label, a {
	font-size: 12px;
}

.input-row {
	display: flex;
	align-items: center;
}

</style>
