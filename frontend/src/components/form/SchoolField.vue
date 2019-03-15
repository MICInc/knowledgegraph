<template>
	<div>
		<div class="autocomplete">
			<input type="text" v-model.trim="school">
		</div>
	</div>
</template>

<script>
export default {
	name: 'school-type-ahead',
	data() {
		return {
			schools: ['Boston University', 'Massachusetts Institute of Technology'],
			school: ''
		}
	},
	props: ['error'],
	watch: {
		school: function(sel, prev) {
			this.$emit('school', sel);
		}
	}
}
</script>

<style>
.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}
</style>