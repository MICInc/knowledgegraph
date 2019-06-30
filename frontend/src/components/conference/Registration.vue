<template>
	<div id="container">
		<h3>Register for MIConf</h3>
		<p>An account will also be created for you by registering for the conference.</p>
		<div v-if="!form.complete">
			<form v-show="form.show" enctype="multipart/form-data">
				<span v-if="!$store.state.isLoggedIn">
					<FirstName
						:error="form.error.first_name.ok"
						v-on:first_name="set_first_name()">
					</FirstName>
					<LastName
						:error="form.error.last_name.ok"
						v-on:first_name="set_last_name()">
					</LastName>
					<label v-if="profile.first_name.length > 0 && profile.last_name.length > 0">Hey {{ profile.first_name }} {{ profile.last_name }}, nice to meet you.</label>
					<DOB 
						:error="form.error.dob"
						v-on:dob="set_dob($event)">
					</DOB>
					<Gender
						:error="form.error.gender.ok"
						v-on:gender="set_gender($event)">
					</Gender>
					<Ethnicity
						:error="form.error.ethnicity.ok"
						v-on:ethnicity="set_ethnicity($event)">
					</Ethnicity>
					<Email
						:error="form.error.email">
					</Email>
					<Password
						:err_pwd="form.error.password.ok"
						:err_pwd_conf="form.error.confirm_pw.ok"
						v-on:err_pwd="set_pwd($event)"
						v-on:confirm_pwd="set_conf_pwd($event)">
					</Password>
				</span>
				<Affiliation
					:error="form.error.affiliation"
					v-on:aff="set_aff($event)">
				</Affiliation>
				<span v-if="profile.affiliation==='MIC Alum'">
					<label>What school did you attend?</label><br>
				</span>
				<span v-else>
					<label>What school do you attend?</label><br>
				</span>
				<SchoolField v-on:school="update($event)"></SchoolField>
				<AcademicYear
					:error="form.error.grade.ok"
					:year="year"
					v-on:grade="set_grade($event)">
				</AcademicYear>
				<Dietary v-on:dietary="set_dietary($event)"></Dietary>
				<Skillsheet></Skillsheet>
				<Questionaire v-on:resp="set_responses($event)"></Questionaire>
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
import SchoolField from '@/components/form/SchoolField'
import SocialLinks from '@/components/form/SocialLinks'
import Disclaimer from '@/components/form/Disclaimer'

// Reg components
import FirstName from '@/components/conference/registration/FirstName.vue'
import LastName from '@/components/conference/registration/LastName.vue'
import DOB from '@/components/conference/registration/DOB.vue'
import Gender from '@/components/conference/registration/Gender.vue'
import Ethnicity from '@/components/conference/registration/Ethnicity.vue'
import Email from '@/components/conference/registration/Email.vue'
import Password from '@/components/conference/registration/Password.vue'
import Affiliation from '@/components/conference/registration/Affiliation.vue'
import AcademicYear from '@/components/conference/registration/AcademicYear.vue'
import Dietary from '@/components/conference/registration/Dietary.vue'
import Skillsheet from '@/components/conference/registration/Skillsheet.vue'
import Questionaire from '@/components/conference/registration/Questionaire.vue'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	components: {
		Disclaimer,
		SchoolField,
		SocialLinks,
		FirstName,
		LastName,
		DOB,
		Gender,
		Ethnicity, 
		Email,
		Password,
		Affiliation,
		AcademicYear,
		Dietary,
		Skillsheet,
		Questionaire
	},
	data() {
		return {
			conf_resp: {
				dietary: '',
				questions: null
			},
			form: {
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
		reveal_travel() {
			this.form.travel = !this.form.travel;
		},
		round(amount) {
			return parseFloat(Math.round(amount * 100) / 100);
		},
		set_aff(aff) {
			this.profile.affiliation = aff;
		},
		set_dietary(diet) {
			this.conf_resp.dietary = diet;
		},
		set_dob(date) {
			this.profile.dob = date;
		},
		set_ethnicity(eth) {
			this.profile.ethnicity = eth;
		},
		set_grade(grade) {
			this.profile.grade = grade;
		},
		set_first_name(name) {
			this.profile.first_name = name;
		},
		set_gender(gender) {
			this.profile.gender = gender;
		},
		set_last_name() {
			this.profile.last_name = name;
		},
		set_pwd(pwd) {
			this.profile.password = pwd;
		},
		set_conf_pwd(pwd) {
			this.profile.confirm_pw = pwd;
		},	
		set_responses(resp) {
			this.conf_resp.questions = resp;
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