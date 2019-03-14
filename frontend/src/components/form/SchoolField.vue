<template>
	<div>
		<input type="text" v-model.trim="school"><br>
		<select :class="{ error: error }" v-model.trim="school">
			<option v-for="name in schools" v-on:click="update()">{{ name }}</option>
		</select>
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