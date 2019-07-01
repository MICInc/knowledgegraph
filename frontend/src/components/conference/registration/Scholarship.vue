<template>
	<div>
		<label>Your scholarship article</label><br>
		<input :class="{ error: error }" type="text" placeholder="URL (optional)" v-model.trim="url" required><br>
	</div>
</template>

<script>
export default {
	name: 'scholarship-app',
	data() {
		return {
			url: ''
		}
	},
	props: ['error'],
	watch: {
		url: function(curr, prev) {
			this.$emit('url', this.url);
		}
	}
}
</script>

<style scoped>
</style>