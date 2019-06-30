<template>
	<div>
		<label>What is your ethnicity?</label><br>
		<select :class="{ error: error }" name="ethnicity" v-model="ethnicity">
			<option v-for="ethnicity in ethnicities">{{ ethnicity }}</option>
		</select><br>
	</div>
</template>

<script>
export default {
	name: 'Ethnicity',
	data () {
		return {
			ethnicity: '',
			ethnicities: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander']
		}
	},
	methods: {
	},
	props: ['error'],
	watch: {
		ethnicity: function(curr, prev) {
			this.$emit('ethnicity', this.ethnicity);
		}
	}
}
</script>

<style>
</style>