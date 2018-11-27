<template>
	<div id="signup_form">
		<div>
			Please create an account to register for our conference.
		</div>
		<form v-if="reveal">
			<label>What's your first name?</label><br>
			<input type="text" placeholder="First name" v-model.trim="profile.first_name" required><br>
			<label>Hey {{ profile.first_name }}, nice to meet you. What's your last name?</label><br>
			<input type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
			<label>Birthday</label><br>
			<select name="year" v-model="profile.dob_year">
				<option></option>
			</select>
			<select name="month" v-model="profile.dob_month">
				<option></option>
			</select>
			<select name="day" v-model="profile.dob_day">
				<option></option>
			</select>
			<label>Where can we contact you?</label><br>
			<input type="text" value="email" placeholder="email" v-model.trim="profile.email"><br>
			<label>Password</label><br>
			<input type="password" value="password" placeholder="password" v-model="profile.password"><br>
			<label>Confirm password</label><br>
			<input type="password" value="password" placeholder="confirm password" v-model="profile.confirm_password"><br>
			<span>Affiliation</span><br>
			<input type="radio" value="alumni" v-model="conf_reg.affiliation">Alumni<br>
			<input type="radio" value="industry" v-model="conf_reg.affiliation">Industry<br>
			<input type="radio" value="mic" v-model="conf_reg.affiliation">MIC member<br>
			<input type="radio" value="non-mic" v-model="conf_reg.affiliation">Non-MIC member<br>
			<input type="radio" value="non-student" v-model="conf_reg.affiliation">Non-student<br>
			<input type="radio" value="sponsor" v-model="conf_reg.affiliation">Sponsor<br>
			<label>What school do you attend?</label><br>
			<select name="school">
				<option>school</option>
			</select><br>
			<label>What grade will you be in Fall of 2018? (e.g. 2nd Year Undergraduate)</label><br>
			<select name="grade" v-model="profile.grade">
				<option v-for="grade in conf_reg.academic_year">{{ grade }}</option>
			</select><br>
			<label>Gender</label><br>
			<select name="gender" v-model="profile.gender">
				<option v-for="gender in conf_reg.gender">{{ gender }}</option>
			</select><br>
			<label>What is your ethnicity?</label><br>
			<select name="ethnicity" v-model="profile.ethnicity">
				<option v-for="ethnicity in conf_reg.ethnicity">{{ ethnicity }}</option>
			</select><br>
			<label>Please list any food you're allergic to:</label><br>
			<input v-model.trim="conf_reg.food_allergens"></input><br>
			<label>Opt-in to share your resume with sponsors</label><br>
			<button v-on:click.prevent="upload_resume">Upload</button><br>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea v-model.trim="conf_reg.message"></textarea><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<router-link to="/login" tag="button">Login</router-link>
		<button v-on:click.prevent="reveal_form">Register</button>
	</div>
</template>

<script>
import ProfileService from '../services/ProfileService.js'
import RegistrationService from '../services/RegistrationService.js'

export default {
	name: 'signup_form',

	data() {
		return {
			conf_reg: {
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
				'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				affiliation: '',
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				food_allergens: '',
				gender: ['Female', 'Male', 'Non-binary'],
				message: ''
			},
			profile: {
				confirm_password: '',
				email: '',
				ethnicity: '',
				first_name: '',
				gender: '',
				grade: '',
				last_name: '',
				password: ''
			},
			reveal: false
		}
	},

	methods: {
		submit() {
			ProfileService.createProfile(this.profile)
			.then(function(data) {
				alert(data);
			});

			RegistrationService.registerConf(this.conf_reg)
			.then(function(data) {
				alert(data);
			});
		},
		reveal_form() {
			this.reveal = !this.reveal;
		},
		upload_resume() {

		}
	}
}
</script>

<style>
</style>