<template>
	<div>
		<label>Where can we contact you?</label>
		<span class="error-msg" v-if="error.ok">{{ error.desc }}</span><br>
		<input :class="{ error: error.ok }" type="text" value="email" placeholder="email" autocomplete="email" v-model.trim="email"><br>
	</div>
</template>

<script>
export default {
	name: 'Email',
	data () {
		return {
			email: ''
		}
	},
	methods: {
	},
	props: ['error'],
	watch: {
		email: function(curr, prev) {
			this.$emit('email', this.email);
		}
	}
}
</script>

<style>
</style>