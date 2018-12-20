<template>
	<div class="birthday">
		<label>Birthday</label><br>
		<label>Year: </label>
		<select name="year" v-model.number="profile.dob_year">
			<option v-for="year in form.years">{{ year }}</option>
		</select>
		<label>Month: </label>
		<select name="month" v-model.number="profile.dob_month">
			<option v-for="(value, index) in 12">{{ value }}</option>
		</select>
		<label>Day: </label>
		<select name="day" v-model.number="profile.dob_day">
			<option v-for="(value, index) in 31">{{ value }}</option>
		</select>
	</div>
</template>

<script>
var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'Birthday',
	data() {
		return {
			form: {
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				dob_day: 0,
				dob_month: 0,
				dob_year: 0,
				gender: ''
			}
		}
	}
}
</script>

<style>
</style>