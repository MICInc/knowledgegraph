<template>
	<div>
		<label>What's your first name?</label><br>
		<input :class="{ error: error }" type="text" placeholder="First name" v-model.trim="first_name" required>
	</div>
</template>

<script>
export default {
	name: 'FirstName',
	data () {
		return {
			first_name: ''
		}
	},
	methods: {
		set_name() {
			this.$emit('first_name', this.first_name);
		}
	},
	props: ['error']
}
</script>

<style>
</style>