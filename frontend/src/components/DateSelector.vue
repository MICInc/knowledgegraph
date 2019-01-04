<template>
	<div class="date">
		<label>Year: </label>
		<select name="year" v-model.number="year" v-bind:input="emit()">
			<option v-for="year in form.years">{{ year }}</option>
		</select>
		<label>Month: </label>
		<select name="month" v-model.number="month" v-bind:input="emit()">
			<option v-for="(value, index) in 12">{{ value }}</option>
		</select>
		<label>Day: </label>
		<select name="day" v-model.number="day" v-bind:input="emit()">
			<option v-for="(value, index) in 31">{{ value }}</option>
		</select>
	</div>
</template>

<script>
var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'DateSelector',
	data() {
		return {
			form: {
				years: years(100, (new Date()).getFullYear())
			},
			day: 0,
			month: 0,
			year: 0
		}
	},
	methods: {
		emit() {
			if(this.day > 0 && this.month > 0 && this.year > 0) {
				this.$emit('date', new Date(this.year, this.month, this.day));
			}
		}
	}
}
</script>

<style>
</style>