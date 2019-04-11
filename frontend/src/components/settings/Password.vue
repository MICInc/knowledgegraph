<template>
	<div class="container">
		<h3>Password</h3>
		<form>
			<input v-model="curr_pw" type="text" placeholder="Current password">
			<input v-model="new_pw" type="text" placeholder="New password">
			<input v-model="confirm_pw" type="text" placeholder="Confirm password">
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
			curr_pw: '',
			new_pw: '',
			confirm_pw: ''
		}
	},
	methods: {
		update() {
			this.$emit('password', { curr_pw: this.curr_pw, new_pw: this.new_pw, confirm_pw: this.confirm_pw });
		}
	}
}
</script>

<style scoped>
</style>