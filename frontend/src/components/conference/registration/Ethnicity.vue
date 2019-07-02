<template>
	<div>
		<label>What is your ethnicity?</label><br>
		<select :class="{ error: error }" name="ethnicity" v-model="ethnicity" @change="set_eth($event)">
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
		set_eth(eth) {
			this.$emit('ethnicity', this.ethnicity)
		}
	},
	props: ['error']
}
</script>

<style>
</style>