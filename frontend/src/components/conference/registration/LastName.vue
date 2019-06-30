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
	methods: {
		set_name() {
			this.$emit(this.last_name, 'last_name');
		}
	},
	props: ['error']
}
</script>

<style>
</style>