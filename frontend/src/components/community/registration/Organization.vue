<template>
	<div class='form-sect'>
		<div>
			<label class="field-header">II. What's the name of your organization?</label><br>
			<input 
				:class="{ error: err_name }" 
				class="full-width" 
				type="text" 
				v-model.trim="name"
				v-on:keyup="update()">
			<br>
		</div>
		<div>
			<label class="field-header">When was your organization established?</label><br>
			<input 
				:class="{ error: err_est }" 
				type="text" 
				class="full-width" 
				v-model.number="established" 
				v-on:keyup="update()">
			<br>
		</div>
		<div>
			<label class="field-header" v-if="name.length == 0">Is your organization affiliated with your college/university?</label>
			<label class="field-header" v-else>Is {{ name }} affiliated with {{ school }}?</label><br>
			<span :class="{ error: err_aff }">
				<input 
					type="radio" 
					value="yes" 
					v-model="exists"
					v-on:click="update()"> Yes
				<input 
					type="radio" 
					value="no" 
					v-model="exists"
					v-on:click="update()"> No
			</span>
		</div>
		<div v-if="exists == 'yes'">
			<label class="field-header">Who can we contact at your institution?</label><br>
			Name: <input 
				type="text" 
				class="full-width" 
				v-model.trim="contact.name"
				v-on:click="update()">
			<br>
			Email: <input 
				type="text" 
				class="full-width" 
				v-model.trim="contact.email"
				v-on:click="update()">
			<br>
		</div>
	</div>
</template>

<script>
export default {
	name: 'organization',
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
	method: {
		update() {
			this.$emit('org', { 
				contact: this.contact,
				established: this.established,
				name: this.name 
			});
		}
	},
	props: ['school', 'err_name', 'err_aff', 'err_est']
}
</script> 

<style>
</style>