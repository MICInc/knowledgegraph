<template>
	<div id="container">
		<h3>Register for MIConf</h3>
		<p>An account will also be created for you by registering for the conference.</p>
		<div v-if="!form.complete">
			<form enctype="multipart/form-data">
				<RegProfile v-on:ok="register($event)"></RegProfile>
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
import RegistrationService from '@/services/RegistrationService.js'
import RegProfile from '@/components/conference/registration/RegProfile.vue'
import Dietary from '@/components/conference/registration/Dietary.vue'
import Skillsheet from '@/components/conference/registration/Skillsheet.vue'
import Questionaire from '@/components/conference/registration/Questionaire.vue'
import Disclaimer from '@/components/form/Disclaimer'
import SocialLinks from '@/components/form/SocialLinks'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	components: {
		Disclaimer,
		SocialLinks,
		RegProfile,
		Dietary,
		Skillsheet,
		Questionaire
	},
	data() {
		return {
			conf_resp: {
				dietary: '',
				questions: undefined
			},
			form: {
				complete: false,
				years: years(100, (new Date()).getFullYear())
			},
			user_id: ''
		}
	},
	methods: {
		register(reg) {
			reg.conf_resp = this.conf_resp;

			RegistrationService.register(reg)
			.then((data) => {
				this.form.complete = data.data;
			})
		},
		set_dietary(diet) {
			this.conf_resp.dietary = diet;
		},
		set_responses(resp) {
			this.conf_resp.questions = resp;
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