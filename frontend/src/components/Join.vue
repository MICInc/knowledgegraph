<template>
	<div id="join">
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input type="text" placeholder="First Name" v-model.trim="profile.first_name" required>
				<input type="text" placeholder="Last Name" v-model.trim="profile.last_name" required>
			</div>
			<input type="email" placeholder="Email" v-model.trim="profile.email" required>
			<select name="gender" placeholder="Gender" v-model="profile.gender">
				<option value="" disabled selected>Select your gender</option>
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select>
			<Birthday></Birthday>
			<!-- <input type="email" placeholder="Birthday" v-model="profile.dob" required> -->
			<input type="password" placeholder="Password" v-model="profile.password" required>
			<input type="password" placeholder="Confirm Password" v-model="profile.confirm_password" required>
		</form>
	</div>
</template>

<script>
import ProfileService from '../services/ProfileService.js'
import Birthday from './BirthdayForm.vue'

export default {
	name: 'join',
	components: {
		Birthday
	},
	data () {
		return {
			form: {
				gender: ['Female', 'Male', 'Non-binary']
			},
			profile: {
				confirm_password: "",
				dob: "",
				email: "",
				first_name: "",
				gender: "",
				last_name: "",
				password: ""
			}
		}
	},

	methods: {
		submit() {
			ProfileService.createProfile(this.profile)
			.then(function(data){
				alert(data);
			});
		}
	}
}
</script>


<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

.input-row input {
	width: calc(50% - 8px);
}

.input-row input:first-child {
	margin-right: 4px;
}

.input-row input:last-child {
	margin-left: 4px;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 300px;
	margin: 80px 0 0 0;
}

input {
	margin: 5px 0;
	padding: 5px;
	border: none;
	background: #535353;
}

label, a {
	font-size: 12px;
}

</style>
