<template>
	<div class='container'>
		<PageNav></PageNav>
		<div>
			<form v-on:submit.prevent="retrieveLogin">
				<input type="email" placeholder="Email" v-model="email" required>
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'forgot',
	components: {
		PageNav
	},
	data() {
		return {
			email: ''
		}
	},
	methods: {
		retrieveLogin() {
			AuthService.forgotLogin({ email: this.email });
			router.push({ name: 'login' })
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
	background: #502984;
	color: #FFF;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 100%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	background: #331a54;
	color: #FFF;
}
</style>