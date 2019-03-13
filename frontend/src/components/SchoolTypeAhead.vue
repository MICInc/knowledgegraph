<template>
	<div>
		<select :class="{ error: error }" id="schools" v-model.trim="school">
			<option v-for="name in schools">{{ name }}</option>
		</select>
	</div>
</template>

<script>
export default{
	name: 'school-type-ahead',
	data() {
		return {
			schools: [],
			school: ''
		}
	},
	props: ['error']
}
</script>

<style>
</style>