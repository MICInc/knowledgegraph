<template>
	<div class="container">
		<h3>Profile</h3>
		<!-- <span>{{}}</span> -->
		<form autocomplete="off">
			<input v-model="username" type="text" placeholder="Username"><br>
			<span class="field-desc">https://machineintelligence.cc/{{username}}</span><br>
			<input v-model="first_name" type="text" placeholder="First name"><br>
			<input v-model="last_name" type="text" placeholder="Last name"><br>
			<input v-model="email" type="text" placeholder="Email"><br>
			<span class="field-desc">Email will not be publicly displayed.</span><br>
			<button type="submit" v-on:click.prevent="update()">Save</button>
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
			email: '',
			username: ''
		}
	},
	methods: {
		update() {
			this.$emit('profile', { 
				username: this.username, 
				first_name: this.first_name, 
				last_name: this.last_name, 
				email: this.email
			});
		}
	}
}
</script>

<style scoped>
input {
	border: 0;
}

.field-desc {
	font-size: 0.7em;
}
</style>