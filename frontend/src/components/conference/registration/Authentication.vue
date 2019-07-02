<template>
	<div>
		<form>
			<label>Where can we contact you?</label>
			<span class="error-msg" v-if="err_email.ok">{{ err_email.desc }}</span><br>
			<input :class="{ error: err_email.ok }" type="text" value="email" placeholder="email" autocomplete="email" v-model.trim="email"><br>
			<label>Password</label><br>
			<input 
				:class="{ error: err_pwd }" 
				type="password" 
				value="password" 
				placeholder="password" 
				autocomplete="new-password" 
				v-model="password"><br>
			<label>Confirm password</label><br>
			<input 
				:class="{ error: err_pwd_conf }" 
				type="password"
				value="password" 
				placeholder="confirm password" 
				autocomplete="new-password" 
				v-model="confirm_pw"><br>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Password',
	data () {
		return {
			email: '',
			password: '',
			confirm_pw: ''
		}
	},
	props: ['err_email', 'err_pwd', 'err_pwd_conf'],
	watch: {
		email: function(curr, prev) {
			this.$emit('email', this.email);
		},
		password: function(curr, prev) {
			this.$emit('password', this.password);
		},
		confirm_pw: function(curr, prev) {
			this.$emit('confirm_pwd', this.confirm_pw)
		},
		async signup() {
			return await AuthService.sign_up(this.profile);
		},
	}
}
</script>

<style>
</style>