<template>
	<div id="signup-form">
		<div v-if="!form.complete">
			<div>
				An account will also be created for you by registering for the conference.
			</div>
			<form v-show="form.show" enctype="multipart/form-data">
				<button v-on:click.prevent="reveal_form">Hide form</button><br>
				<label>What's your first name?</label><br>
				<input :class="{ error: form.error.first_name }" type="text" placeholder="First name" v-model.trim="profile.first_name" required><br>
				<label>What's your last name?</label><br>
				<input :class="{ error: form.error.last_name }" type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
				<label v-if="profile.first_name.length > 0 && profile.last_name.length > 0">Hey {{ profile.first_name }} {{ profile.last_name }}, nice to meet you.</label>
				<div class="birthday">
					<label :class="{ error_font: form.error.dob }">Birthday</label>
					<DateSelector v-on:date="set_dob($event)"></DateSelector>
				</div>
				<label>Where can we contact you?</label><br>
				<input :class="{ error: form.error.email }" type="text" value="email" placeholder="email" v-model.trim="profile.email"><br>
				<label>Password</label><br>
				<input :class="{ error: form.error.password }" type="password" value="password" placeholder="password" v-model="profile.password"><br>
				<label>Confirm password</label><br>
				<input :class="{ error: form.error.confirm_pw }" type="password" value="password" placeholder="confirm password" v-model="profile.confirm_password"><br>
				<label :class="{ error_font: form.error.affiliation }">Affiliation</label><br>
				<ul >
					<li v-for="affiliation in form.affiliation">
						<input type="radio" v-bind:value="affiliation" v-model="profile.affiliation">{{ affiliation }}
					</li>
				</ul>
				<label>What school do you attend?</label><br>
				<select :class="{ error: form.error.school }" name="school" v-model="profile.school">
					<option v-for="school in form.schools">{{ school.name }}</option>
				</select><br>
				<label>What grade will you be in Fall of 2018? (e.g. 2nd Year Undergraduate)</label><br>
				<select :class="{ error: form.error.grade }" name="grade" v-model="profile.grade">
					<option v-for="grade in form.academic_year">{{ grade }}</option>
				</select><br>
				<label>Gender</label><br>
				<select :class="{ error: form.error.gender }" name="gender" v-model="profile.gender">
					<option v-for="gender in form.gender">{{ gender }}</option>
				</select><br>
				<label>What is your ethnicity?</label><br>
				<select :class="{ error: form.error.ethnicity }" name="ethnicity" v-model="profile.ethnicity">
					<option v-for="ethnicity in form.ethnicity">{{ ethnicity }}</option>
				</select><br>
				<label>Please list any food you're allergic to:</label><br>
				<input v-model.trim="conf_resp.food_allergens"></input><br>
				<label>Opt-in to share your resume with sponsors</label><br>
				<input type="file" name="resume" multiple v-on:change="add_file($event, 0)"><br>
				<label>How did you hear about our conference?</label><br>
				<textarea v-model.trim="conf_resp.q1"></textarea><br>
				<label>What future do you see for machine intelligence that others don't? (max 200 characters)</label><br>
				<textarea v-model.trim="conf_resp.q2" maxlength="200"></textarea><br>
				<label>What do you want out of this conference and anything else we should know? (max. 200 characters)</label><br>
				<textarea v-model.trim="conf_resp.q3" maxlength="200"></textarea><br>
				<button v-on:click.prevent="submit">Submit</button><button v-on:click.prevent="reveal_form">Hide form</button>
			</form>
		</div>
		<div v-if="form.complete">
			Thanks for submititng your application for our conference!<br>
			Stay updated with the Machine Intelligence Community<br>
			<a href="https://www.facebook.com/miconference/">Facebook</a>
			<a href="https://twitter.com/mic_conf">Twitter</a>
			<a href="https://www.youtube.com/channel/UCEkwg51OD930FsyTx7bV0Pg">YouTube</a>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthenticationService'
import RegistrationService from '@/services/RegistrationService.js'
import ContentService from '@/services/ContentService.js'
import institutions from '@/data/schools.json'
import DateSelector from '@/components/DateSelector'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	components: {
		DateSelector
	},
	data() {
		return {
			conf_resp: {
				food_allergens: '',
				q1: '',
				q2: '',
				q3: ''
			},
			form: {
				affiliation: ['MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor'],
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
					'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				complete: false,
				data: new FormData(),
				error: {
					affiliation: false,
					confirm_pw: false,
					dob: false,
					email: false,
					ethnicity: false,
					first_name: false,
					gender: false,
					grade: false,
					last_name: false,
					password: false,
					school: false
				},
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				gender: ['Female', 'Male', 'Non-binary'],
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				schools: institutions,
				show: true,
				travel: false,
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				affiliation: '',
				confirm_password: '',
				dob: undefined,
				email: '',
				ethnicity: '',
				first_name: '',
				gender: '',
				grade: '',
				last_name: '',
				password: '',
				school: ''
			},
			reimburse: {
				address: {
					apt: '',
					city: '',
					state: '',
					street: '',
					zip: ''
				},
				travel: [{
					amount: 0,
					date: undefined,
					dest: '',
					src: '',
				}],
				hotel: [{
					amount: 0,
					check_in: undefined,
					check_out: undefined,
					name: '',
				}],
				misc: [{
					amount: 0,
					date: undefined,
					item: '',
				}],
				total: '0'
			},
			user_id: ''
		}
	},
	methods: {
		add_file(event, index) {
			var file = event.target.files[0];
			var filename = file.name;

			this.conf_resp.resume = filename;
			this.form.data.append('resume', file, filename);
		},
		is_string(data) {
			return (typeof data === 'string' || data instanceof String);
		},
		reveal_form() {
			this.$emit('reveal');
		},
		reveal_travel() {
			this.form.travel = !this.form.travel;
		},
		round(amount) {
			return parseFloat(Math.round(amount * 100) / 100);
		},
		set_dob(date) {
			this.profile.dob = date;
		},
		async signup() {
			return await AuthService.signUpUser(this.profile);
		},
		submit() {
			this.signup().then((response) => {
				var err = response.data.error;
				console.log(err != undefined);
				console.log(response.status == 200);
				console.log(err);

				if(err != undefined && response.status == 200) {
					this.form.error = err;
				} 
				else if(response.status == 200) {
					var reg = { reimbursements: this.reimburse, conf_resp: this.conf_resp };
					
					RegistrationService.register(reg).then(function(data) {
						console.log(data);
						this.form.complete = true;
					});
				}
			});
		}
	}
}
</script>

<style scoped>

#signup-form {
	margin-top: 20px;
}

label {
	font-size: 13px;
	font-weight: 600;
}

input {
	border: transparent;
	width: 600px;
}

ul li input {
	margin: 5px 10px 0 0;
	width: 10px;
}

ul {
	margin-bottom: 10px;
}

.action-buttons {
	margin-top: 10px;
}

.action-buttons button {
	margin-right: 10px;
}

button {
	margin: 10px 0;
}

textarea {
	width: calc(600px - 10px);
	min-height: 75px;
	border: transparent;
}

.birthday select {
	margin-right: 10px;
}

.error {
	border: solid;
	border-color: red;
}

</style>