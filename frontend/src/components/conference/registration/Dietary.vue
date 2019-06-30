<template>
	<div>
		<label>Please list any dietary restrictions:</label><br>
		<input v-model.trim="dietary"></input><br>
	</div>
</template>

<script>
export default {
	name: 'Dietary',
	components: {
	},
	data () {
		return {
			dietary: ''
		}
	},
	watch: {
		dietary: function(curr, prev) {
			this.$emit('dietary', this.dietary);
		}
	}
}
</script>

<style scoped>
</style>