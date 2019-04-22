<template>
	<div class="container">
		<h4>Password</h4>
		<form autocomplete="off">
			<input v-model="current" type="password" placeholder="Current password" autocomplete="off"><br>
			<input v-model="new_pw" type="password" placeholder="New password" autocomplete="off"><br>
			<input v-model="confirm_pw" type="password" placeholder="Confirm password" autocomplete="off"><br>
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
			current: '',
			new_pw: '',
			confirm_pw: ''
		}
	},
	methods: {
		update() {
			this.$emit('password', { current: this.current, new_pw: this.new_pw, confirm_pw: this.confirm_pw });
		}
	}
}
</script>

<style scoped>
input {
	border: 0;
}
</style>