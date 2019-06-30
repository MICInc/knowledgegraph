<template>
	<div>
		<label>Password</label><br>
		<input :class="{ error: err_pwd }" type="password" value="password" placeholder="password" autocomplete="new-password" v-model="password"><br>
		<label>Confirm password</label><br>
		<input :class="{ error: err_pwd_conf }" type="password" value="password" placeholder="confirm password" autocomplete="new-password" v-model="confirm_pw"><br>
	</div>
</template>

<script>
export default {
	name: 'Password',
	data () {
		return {
			password: '',
			confirm_pw: ''
		}
	},
	props: ['err_pwd', 'err_pwd_conf'],
	watch: {
		password: function(curr, prev) {
			this.$emit('password', this.password);
		},
		confirm_pw: function(curr, prev) {
			this.$emit('confirm_pw', this.confirm_pw)
		}
	}
}
</script>

<style>
</style>