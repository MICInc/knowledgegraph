<template>
	<div id="signup_form">
		<div>
			Please create an account to register for our conference.
		</div>
		<form v-if="reveal">
			<label>What's your first name?</label><br>
			<input type="text" placeholder="First name" v-model.trim="profile.firstname" required><br>
			<label>Hey {{ conf_reg.firstname }}, nice to meet you. What's your last name?</label><br>
			<input type="text" placeholder="Last name" v-model.trim="profile.lastname" required><br>
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
			<select name="grade" v-model="conf_reg.grade">
				<option>Not in school</option>
				<option>Elementary school</option>
				<option>Middle school</option>
				<option>High school</option>
				<option>Freshman</option>
				<option>Sophomore</option>
				<option>Junior</option>
				<option>Senior</option>
				<option>Masters</option>
				<option>PhD</option>
				<option>Postdoc</option>
			</select><br>
			<label>Gender</label><br>
			<select name="gender" v-model="conf_reg.gender">
				<option>Female</option>
				<option>Male</option>
				<option>Non-binary</option>
			</select><br>
			<label>What is your ethnicity?</label><br>
			<select name="ethnicity" v-model="conf_reg.ethnicity">
				<option>African</option>
				<option>Asian</option>
				<option>European</option>
				<option>Hispanic</option>
				<option>Multiracial</option>
				<option>Native American</option>
				<option>Pacific Islander</option>
			</select><br>
			<label>Please list any food you're allergic to:</label><br>
			<input v-model.trim="conf_reg.food_allergens"></input><br>
			<label>Opt-in to share your resume with sponsors</label><br>
			<button v-on:click.prevent="upload_resume">Upload</button><br>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea v-model.trim="conf_reg.message"></textarea><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<button v-on:click.prevent="reveal_form">Register</button>
	</div>
</template>

<script>
import ProfileService from '../services/ProfileService.js'

export default {
	name: 'signup_form',

	data() {
		return {
			conf_reg: {
				affiliation: '',
				ethnicity: '',
				food_allergens: '',
				grade: '',
				gender: '',
				message: ''
			},
			profile: {
				confirm_password: '',
				email: '',
				first_name: '',
				last_name: '',
				password: ''
			},
			reveal: false
		}
	},

	methods: {
		submit() {
			ProfileService.createProfile({profile: this.profile, conf_reg: this.conf_reg })
			.then(function(data){
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