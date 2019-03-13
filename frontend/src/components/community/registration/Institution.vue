<template>
	<div class='form-sect'>
		<label class="expand-section" v-on:click="show_established_form()">II. Does your community already exist?</label><br>
		<label class="field-header">What's the name of your organization?</label><br>
		<input :class="{ error: err_name }" class="full-width" type="text" v-model.trim="name"><br>
		<label class="field-header">When was your organization established?</label><br>
		<input :class="{ error: err_est }" type="text" class="full-width" v-model.number="established"><br>
		<span>
			<label class="field-header" v-if="name.length == 0">Is your organization affiliated with an institution?</label>
			<label class="field-header" v-else>Is {{ name }} affiliated with an institution? </label>
		</span><br>
		<span :class="{ error: err_aff }">
			<input type="radio" value="yes" v-model="exists"> Yes
			<input type="radio" value="no" v-model="exists"> No
		</span>
		<br>
		<span v-if="exists == 'yes'">
			<label class="field-header">What's the name of the institution:</label>
			<br>
			<input type="text" class="full-width" v-model.trim="affiliation.name"><br>
			<label class="field-header">Who can we contact at your institution?</label>
			<br>
			Name: <input type="text" class="full-width" v-model.trim="affiliation.contact.name"><br>
			Email: <input type="text" class="full-width" v-model.trim="affiliation.contact.email"><br>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			affiliation: {
				name: '',
				contact: {
					email: '',
					name: ''
				}
			},
			established: '',
			exists: false,
			name: ''
		}
	},
	props: ['err_name', 'err_aff', 'err_est']
}
</script> 

<style>
</style>