<template>
	<div class="container">
		<h3>Profile</h3>
		<form>
			<input v-model="first_name" type="text" placeholder="First name"><br>
			<input v-model="last_name" type="text" placeholder="Last name"><br>
			<input v-model="email" type="text" placeholder="Email"><br>
			<button type="submit">Save</button>
		</form>
	</div>
</template>

<script>
import router from '@/router'

export default {
	name: 'password',
	data() {
		return {
			first_name: '',
			last_name: '',
			email: ''
		}
	},
	methods: {
		update() {
			this.$emit('profile', { first_name: this.first_name, last_name: this.last_name, email: this.email });
		}
	}
}
</script>

<style scoped>
input {
	border: 0;
}
</style>