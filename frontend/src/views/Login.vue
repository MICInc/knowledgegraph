<template>
	<div class="login main">
		<PageNav></PageNav>
		<div class="container">
			<form v-on:submit.prevent="handleSubmit">
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

export default {
	name: 'login',
	components: {
		PageNav,
	},

	data () {
		return {
			formData: {}
		}
	},

	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
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
