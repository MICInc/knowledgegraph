<template>
	<div>
		<label>What grade will you be in Fall of {{ year }}? (e.g. 2nd Year Undergraduate)</label><br>
		<select :class="{ error: error }" name="grade" v-model="grade" @change="set_grade($event)">
			<option v-for="grade in academic_year">{{ grade }}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'AcademicYear',
	data () {
		return {
			academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school', 'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
			grade: ''
		}
	},
	methods: {
		set_grade(grade) {
			this.$emit('grade', this.grade);
		}
	},
	props: ['error', 'year'],
}
</script>

<style scoped>
</style>