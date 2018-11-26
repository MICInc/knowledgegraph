<template>
	<div id="signup_form">
		<form v-if="reveal">
			<label>What's your first name?</label><br>
			<input type="text" placeholder="First name" v-model="form.firstname" required><br>
			<label>Hey {{ form.firstname }}, nice to meet you. What's your last name?</label><br>
			<input type="text" placeholder="Last name" v-model="form.lastname" required><br>
			<span>Affiliation</span><br>
			<input type="checkbox" value="alumni">Alumni<br>
			<input type="checkbox" value="industry">Industry<br>
			<input type="checkbox" value="mic">MIC member<br>
			<input type="checkbox" value="mic">Non-MIC member<br>
			<input type="checkbox" value="non-student">Non-student<br>
			<input type="checkbox" value="sponsor">Sponsor<br>
			<label>What school do you attend?</label><br>
			<select name="school">
				<option>school</option>
			</select><br>
			<label>What grade will you be in Fall of 2018? (e.g. 2nd Year Undergraduate)</label><br>
			<select name="grade">
				<option value="grade">Freshman</option>
				<option value="grade">Sophomore</option>
				<option value="grade">Junior</option>
				<option value="grade">Senior</option>
				<option value="grade">Masters</option>
				<option value="grade">PhD</option>
				<option value="grade">Postdoc</option>
			</select><br>
			<label>Gender</label><br>
			<select name="gender">
				<option value="female">Female</option>
				<option value="male">Male</option>
				<option value="non-binary">Non-binary</option>
			</select><br>
			<label>What is your ethnicity?</label><br>
			<select name="ethnicity">
				<option>African</option>
				<option>Asian</option>
				<option>European</option>
				<option>Hispanic</option>
				<option>Multiracial</option>
				<option>Native American</option>
				<option>Pacific Islander</option>
			</select><br>
			<label>Please list any food you're allergic to:</label><br>
			<textarea></textarea><br>
			<label>Opt-in to share your resume with sponsors</label><br>
			<button v-on:click.prevent="upload_resume">Upload</button><br>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea></textarea><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<button v-on:click.prevent="reveal_form">Register</button>
	</div>
</template>

<script>
export default {
	name: 'signup_form',
	
	data() {
		return {
			reveal: false,
			form: {
				firstname: '',
				lastname: ''
			}
		}
	},

	methods: {
		submit() {

		},
		reveal_form() {
			this.reveal = !this.reveal;
		}
	}
}
</script>

<style>
</style>