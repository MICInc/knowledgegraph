<template>
	<div id="container">
		<div v-if="!form.complete">
			<form v-show="form.show" enctype="multipart/form-data">
				<button v-on:click.prevent="reveal_form">Hide form</button><br>
				<div class="top-message">
					An account will also be created for you by registering for the conference.
				</div>
				<span v-if="!$store.state.isLoggedIn">
					<label>What's your first name?</label><br>
					<input :class="{ error: form.error.first_name.ok }" type="text" placeholder="First name" v-model.trim="profile.first_name" required><br>
					<label>What's your last name?</label><br>
					<input :class="{ error: form.error.last_name.ok }" type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
					<label v-if="profile.first_name.length > 0 && profile.last_name.length > 0">Hey {{ profile.first_name }} {{ profile.last_name }}, nice to meet you.</label>
					<div class="birthday">
						<label :class="{ error_font: form.error.dob }">Birthday</label>
						<DateSelector v-on:date="set_dob($event)"></DateSelector>
					</div>
					<label>Gender</label><br>
					<select :class="{ error: form.error.gender.ok }" name="gender" v-model="profile.gender">
						<option v-for="gender in form.gender">{{ gender }}</option>
					</select><br>
					<label>What is your ethnicity?</label><br>
					<select :class="{ error: form.error.ethnicity.ok }" name="ethnicity" v-model="profile.ethnicity">
						<option v-for="ethnicity in form.ethnicity">{{ ethnicity }}</option>
					</select><br>
					<label>Where can we contact you?</label>
					<span class="error-msg" v-if="form.error.email.ok">{{form.error.email.desc}}</span><br>
					<input :class="{ error: form.error.email.ok }" type="text" value="email" placeholder="email" autocomplete="email" v-model.trim="profile.email"><br>
					<label>Password</label><br>
					<input :class="{ error: form.error.password.ok }" type="password" value="password" placeholder="password" autocomplete="new-password" v-model="profile.password"><br>
					<label>Confirm password</label><br>
					<input :class="{ error: form.error.confirm_pw.ok }" type="password" value="password" placeholder="confirm password" autocomplete="new-password" v-model="profile.confirm_pw"><br>
				</span>
				<label :class="{ error_font: form.error.affiliation }">Affiliation</label><br>
				<ul>
					<li v-for="affiliation in form.affiliation">
						<input type="radio" v-bind:value="affiliation" v-model="profile.affiliation">{{ affiliation }}
					</li>
				</ul>
				<span v-if="profile.affiliation==='MIC Alum'">
					<label>What school did you attend?</label><br>
				</span>
				<span v-else>
					<label>What school do you attend?</label><br>
				</span>
				<SchoolField v-on:school="update($event)"></SchoolField>
				<label>What grade will you be in Fall of {{ year }}? (e.g. 2nd Year Undergraduate)</label><br>
				<select :class="{ error: form.error.grade.ok }" name="grade" v-model="profile.grade">
					<option v-for="grade in form.academic_year">{{ grade }}</option>
				</select><br>
				<label>Please list any food you're allergic to:</label><br>
				<input v-model.trim="conf_resp.food_allergens"></input><br>
				<label>Opt-in to <a href="https://www.dropbox.com/request/UEtnUpmQ5AHMOw8PmrvN" target="_blank">share</a> your skill sheet with sponsors</label><br>
				<label>How did you hear about our conference?</label><br>
				<textarea v-model.trim="conf_resp.q1"></textarea><br>
				<label>What future do you see for machine intelligence that others don't? (max 200 characters)</label><br>
				<textarea v-model.trim="conf_resp.q2" maxlength="200"></textarea><br>
				<label>What do you want out of this conference and anything else we should know? (max. 200 characters)</label><br>
				<textarea v-model.trim="conf_resp.q3" maxlength="200"></textarea><br>
				<Disclaimer></Disclaimer>
				<button v-on:click.prevent="submit">Submit</button>
			</form>
		</div>
		<div v-if="form.complete">
			Thanks for submititng your application for our conference!<br>
			Stay updated with the Machine Intelligence Community<br>
			<SocialLinks></SocialLinks>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthenticationService'
import RegistrationService from '@/services/RegistrationService.js'
import DateSelector from '@/components/form/DateSelector'
import SchoolField from '@/components/form/SchoolField'
import SocialLinks from '@/components/form/SocialLinks'
import Disclaimer from '@/components/form/Disclaimer'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	components: {
		DateSelector,
		Disclaimer,
		SchoolField,
		SocialLinks
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
				affiliation: ['MIC Alum', 'MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor'],
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
					'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				complete: false,
				error: {
					affiliation: { ok: false, desc: ''},
					confirm_pw: { ok: false, desc: ''},
					dob: { ok: false, desc: ''},
					email: { ok: false, desc: ''},
					ethnicity: { ok: false, desc: ''},
					first_name: { ok: false, desc: ''},
					gender: { ok: false, desc: ''},
					grade: { ok: false, desc: ''},
					last_name: { ok: false, desc: ''},
					password: { ok: false, desc: ''},
					school: { ok: false, desc: ''}
				},
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				gender: ['Female', 'Male', 'Non-binary'],
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				schools: [],
				show: true,
				travel: false,
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				affiliation: '',
				confirm_pw: '',
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
			social: [
				{ mouse: false, hover: '/img/social-media-icons/facebook-icon-hover.png', href: 'https://www.facebook.com/miconference', img: '/img/social-media-icons/facebook-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/twitter-icon-hover.png', href: 'https://twitter.com/mic_conf', img: '/img/social-media-icons/twitter-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/youtube-icon-hover.png', href: 'https://www.youtube.com/channel/UCEkwg51OD930FsyTx7bV0Pg', img: '/img/social-media-icons/youtube-icon.png' },
				{ mouse: false, hover: '/img/social-media-icons/reddit-icon-hover.png', href: 'https://www.reddit.com/user/MICInc', img: '/img/social-media-icons/reddit-icon.png' }
			],
			user_id: '',
			year: (new Date()).getFullYear()
		}
	},
	methods: {
		add_file(event, index) {
			var file = event.target.files[0];
			var filename = file.name;

			this.conf_resp.resume = filename;
			this.profile.resume.append('resume', file, filename);
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
			return await AuthService.sign_up(this.profile);
		},
		submit() {
			this.signup().then((resp) => {
				var err = resp.data.error;

				if(err != undefined && resp.status == 200) {
					this.form.error = err;
					alert('Please check over your application.');
				} 
				else if(resp.status == 200) {
					var reg = { 
						email: this.profile.email, 
						first_name: this.profile.first_name,
						last_name: this.profile.last_name,
						reimbursements: this.reimburse, 
						conf_resp: this.conf_resp 
					};
			
					RegistrationService.register(reg)
					.then((data) => {
						this.form.complete = data.data;
					})
					.catch((error) => {

					});
				}
			});
		},
		update(data) {
			this.profile.school = data;
		}
	}
}
</script>

<style scoped>

label {
	font-size: 13px;
	font-weight: 600;
	margin-right: 1em;
}

input {
	width: 600px;
}

ul {
	margin-bottom: 10px;
}

ul li {
	display: row;
}

ul li input {
	margin: 5px 10px 0 0;
	width: 10px;
}

textarea {
	width: calc(100% - 10px);
	min-height: 75px;
}

.birthday select {
	margin-right: 10px;
}

.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}

.error-msg {
	color: red;
	font-size: 13px;
	font-weight: 600;
}

.social-links {
	margin-right: 10px;
}

.social-icon {
	margin-left: 0;
	width: 40px;
	margin-left: 5px;
}

</style>