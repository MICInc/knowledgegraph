<template>
	<div id="container">
		<div v-if="!open">
			<h2>{{ year }} registration will open soon. Please follow our social media for updates!</h2>
		</div>
		<div v-if="open && !form.complete && !form.already_registered">
			<h3>Register for MIC {{ this_year }}</h3>
			<p>Machine Intelligence Conference is free to attend and registration is limited to current students. An account will also be created for you by registering for the conference.</p>
			<form enctype="multipart/form-data">
				<RegProfile 
					:error="form.error"
					v-on:update="update_profile($event)">
				</RegProfile>
				<Dietary v-on:dietary="set_dietary($event)"></Dietary>
				<Skillsheet v-on:skills="set_skills($event)"></Skillsheet>
				<Questionaire v-on:resp="set_responses($event)"></Questionaire>
				<Disclaimer></Disclaimer>
				<button v-on:click.prevent="submit">Submit</button>
			</form>
		</div>
		<div v-if="form.complete">
			Thanks for submititng your application for our conference! Please check your email to verify your account.<br>
			Stay updated with the Machine Intelligence Community<br>
			<SocialLinks></SocialLinks>
		</div>
		<div v-if="form.already_registered && !form.url_updated">
			<h3>IBM Diversity Scholarship 2019</h3>
			<p>You're registered for Machine Intelligence Conference 2019. Please consider applying for our conference scholarship. If you have already applied, submitting again will overwrite your previously submitted article url. See <a href="/conference/scholarship">here</a> for more details.</p>
			<form>
				<Scholarship :error="form.error_scholarship" v-on:url="set_url($event)"></Scholarship>
				<button v-on:click.prevent="apply">Apply</button>
			</form>
		</div>
		<div v-if="form.url_updated">
			<h3>IBM Diversity Scholarship 2019</h3>
			<p>Thank you for applying to the IBM Diversity Scholarship! Your application has been updated.</p>
		</div>
	</div>
</template>

<script>
import AuthService from '@/services/AuthenticationService'
import RegistrationService from '@/services/RegistrationService.js'
import RegProfile from '@/components/conference/registration/RegProfile.vue'
import Dietary from '@/components/conference/registration/Dietary.vue'
import Skillsheet from '@/components/conference/registration/Skillsheet.vue'
import Questionaire from '@/components/conference/registration/Questionaire.vue'
import Disclaimer from '@/components/form/Disclaimer'
import SocialLinks from '@/components/form/SocialLinks'
import Scholarship from '@/components/conference/registration/Scholarship.vue'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	beforeMount() {
		if(this.$store.state.isLoggedIn) {
			RegistrationService.am_i_registered({ token: this.$store.state.accessToken, email: this.$store.state.userInfo.email })
			.then((resp) => {
				this.form.already_registered = resp.data.ok;
			});
		}
	},
	components: {
		Disclaimer,
		SocialLinks,
		RegProfile,
		Dietary,
		Skillsheet,
		Questionaire,
		Scholarship
	},
	data() {
		return {
			year: (new Date()).getFullYear()+1,
			open: false,
			conf_resp: {
				dietary: '',
				questions: undefined,
				social_accts: undefined,
				scholarship_article: ''
			},
			form: {
				error: undefined,
				complete: false,
				already_registered: false,
				error_scholarship: false,
				url_updated: false,
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				affiliation: '',
				confirm_pw: '',
				dob: '',
				email: '',
				ethnicity: '',
				first_name: '',
				gender: '',
				grade: '',
				last_name: '',
				password: '',
				school: ''
			},
			user_id: '',
			this_year: (new Date()).getFullYear()
		}
	},
	methods: {
		async apply_for_scholarship() {
			var app = {
				token: this.$store.state.accessToken, 
				email: this.$store.state.userInfo.email,
				url: this.conf_resp.scholarship_article
			};

			return await RegistrationService.apply_for_scholarship(app);
		},
		async signup() {
			return await AuthService.sign_up(this.profile);
		},
		apply() {
			this.apply_for_scholarship()
			.then((resp) => {
				this.form.error_scholarship = resp.data.error;
				if(!resp.data.error) this.form.url_updated = true;
			});
		},
		set_dietary(diet) {
			this.conf_resp.dietary = diet;
		},
		set_responses(resp) {
			this.conf_resp.questions = resp;
		},
		set_skills(data) {
			this.conf_resp.social_accts = data;
		},
		set_url(url) {
			this.conf_resp.scholarship_article = url;
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
						reimbursements: null,
						conf_resp: this.conf_resp
					};
			
					RegistrationService.register(reg)
					.then((data) => {
						this.form.complete = data.data;
					});
				}
			});
		},
		update_profile(data) {
			this.profile = data;
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
</style>