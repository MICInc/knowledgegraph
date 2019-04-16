<template>
	<div class="container">
		<h3>Deactivate account</h3>
		<span class="desc">This will disable your account. You will no longer show up in search results and your account will no longer be visible. Your account can be reactivated by logging in.</span>
		<form>
			<input v-model="password" type="text" placeholder="Current password"><br>
			<input v-model="confirm" type="text" placeholder="Confirm password"><br>
			<button type="submit" v-on:click.prevent="deactivate">Deactivate</button>
		</form>
	</div>
</template>

<script>
import router from '@/router'

export default {
	name: 'deactivate',
	data() {
		return {
			password: '',
			confirm: ''
		}
	},
	methods: {
		deactivate() {
			alert('You are about to deactivate.');
			this.$emit('deactivate', { password: this.password, confirm: this.confirm });
		}
	}
}
</script>

<style scoped>
input {
	border: 0;
}

.desc {
	font-size: .9em;
}
</style>