<template>
	<div>
		<select :class="{error: form.error.school }" id="schools" v-model.trim="org.school">
			<option v-for="school in form.schools">{{ school.name }}</option>
		</select>
	</div>
</template>

<script>
export default{
	name: 'school-type-ahead',
	data() {
		return {

		}
	}
}
</script>

<style>
</style>