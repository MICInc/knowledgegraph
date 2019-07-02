<template>
	<div class="birthday">
		<label>Birthday</label>
		<DateSelector :error="error" v-on:date="set_dob($event)"></DateSelector>
	</div>
</template>

<script>
import DateSelector from '@/components/form/DateSelector'

export default {
	name: 'DOB',
	components: {
		DateSelector
	},
	data () {
		return {
		}
	},
	methods: {
		set_dob(date) {
			this.$emit('dob', date);
		}
	},
	props: ['error']
}
</script>

<style>
.birthday select {
	margin-right: 10px;
}
</style>