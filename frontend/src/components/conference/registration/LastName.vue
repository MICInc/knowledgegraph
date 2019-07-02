<template>
	<div>
		<label>What's your last name?</label><br>
		<input :class="{ error: error }" type="text" placeholder="Last name" v-model.trim="last_name" required>
	</div>
</template>

<script>
export default {
	name: 'LastName',
	data () {
		return {
			last_name: ''
		}
	},
	props: ['error'],
	watch: {
		last_name: function(curr, prev) {
			this.$emit('last_name', this.last_name);
		}
	}
}
</script>

<style>
</style>