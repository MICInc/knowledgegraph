<template>
	<div class='container'>
		<PageNav></PageNav>
		<div>
			<h3>Forgot login</h3>
			<div v-if="!sent">
				<form v-on:submit.prevent="retrieve_login">
					<input type="email" placeholder="Email" v-model="email" required>
					<button type="submit">Submit</button>
				</form>
			</div>
			<div v-else>
				Login credentials sent! Please check your email.
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import AuthenticationService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'forgot',
	components: {
		PageNav
	},
	data() {
		return {
			email: '',
			sent: false
		}
	},
	methods: {
		retrieve_login() {
			AuthenticationService.retrieve_login({ email: this.email })
			.then((resp) => {
				this.send = true;
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
	height: 40px;
}
</style>