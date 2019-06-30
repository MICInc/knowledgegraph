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
	props: ['error'],
	watch: {
		first_name: function(curr, prev) {
			this.$emit('first_name', this.first_name);
		}
	}
}
</script>

<style>
</style>