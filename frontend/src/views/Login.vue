<template>
	<div id="login">
		<PageNav></PageNav>
		<form v-on:submit.prevent="handleSubmit">
			<input type="email" placeholder="Email" v-model="formData.email" required>
			<input type="password" placeholder="Password" v-model="formData.password" required>
			<button type="submit">Login</button>
			<label>
				<input type="checkbox" checked="checked" name="remember"> Remember me
			</label>
			<span>
				<router-link type="a" to="forgot">Forgot account?</router-link>
			</span>
		</form>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedArticle from '@/components/LinkedArticle.vue'

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

.input-row {
	display: flex;
	align-items: center;
}

</style>
