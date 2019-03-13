<template>
	<div class='form-sect'>
		<div>
			<label class="field-header">II. What's the name of your organization?</label><br>
			<input :class="{ error: err_name }" class="full-width" type="text" v-model.trim="name"><br>
		</div>
		<div>
			<label class="field-header">When was your organization established?</label><br>
			<input :class="{ error: err_est }" type="text" class="full-width" v-model.number="established"><br>
		</div>
		<div>
			<label class="field-header" v-if="name.length == 0">Is your organization affiliated with your college/university?</label>
			<label class="field-header" v-else>Is {{ name }} affiliated with {{ school }}?</label><br>
			<span :class="{ error: err_aff }">
				<input type="radio" value="yes" v-model="exists"> Yes
				<input type="radio" value="no" v-model="exists"> No
			</span>
		</div>
		<div v-if="exists == 'yes'">
			<label class="field-header">Who can we contact at your institution?</label><br>
			Name: <input type="text" class="full-width" v-model.trim="contact.name"><br>
			Email: <input type="text" class="full-width" v-model.trim="contact.email"><br>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			contact: {
				email: '',
				name: ''
			},
			established: '',
			exists: false,
			name: ''
		}
	},
	props: ['school', 'err_name', 'err_aff', 'err_est']
}
</script> 

<style>
</style>