<template>
	<div class="date">
		<label>Year: </label>
		<select name="year" v-model.number="year" :input="emit()">
			<option v-for="year in form.years">{{ year }}</option>
		</select>
		<label>  Month: </label>
		<select name="month" v-model.number="month" :input="emit()">
			<option v-for="month in 12">{{ month }}</option>
		</select>
		<label>  Day: </label>
		<select name="day" v-model.number="day" :input="emit()" :class="{ error: error }">
			<option v-for="day in 31">{{ day }}</option>
		</select>
	</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
	name: 'DateSelector',
	data() {
		return {
			form: {
				years: this.years(100, (new Date()).getFullYear())
			},
			day: 0,
			month: 0,
			year: 0,
			error: false
		}
	},
	methods: {
		emit() {
			if(this.year > 0 && this.month > 0 && this.day > 0) {
				AuthenticationService.check_date({ year: this.year, month: this.month, day: this.day })
				.then((resp) => {
					var error = resp.data.error;
					if(!error) this.$emit('date', new Date(`${this.year}-${this.month}-${this.day}`));
				});
			}
		},
		years(size, today) {
			return [...Array(size).keys()].map(i => today - i);
		}
	}
}
</script>

<style>
label {
	color: #606060;
}

select {
	border: transparent;
	border-width: 0.5px;
}

.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}
</style>