<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>MIC Gender Diversity Scholarship</h3>
		<p>The goal of our scholarship is to promote diversity in the field of machine intelligence and democratize educational content with our gender and ethnic diversity scholarships.</p>
		<span><b>Submission deadline</b>: July 31, 2019 11:59 PM EST</span><br>
		<label>General Requirements</label>
		<ul>
			<li v-for="(r, i) in reqs">{{ i+1 }}. {{ r }}</li>
		</ul>
		<div>
			<h4>Application</h4>
			<div v-if="!form.complete">
				<RegProfile 
					:error="form.error"
					v-on:update="update_profile($event)">
				</RegProfile>
				<Dietary v-on:dietary="set_dietary($event)"></Dietary>
				<Skillsheet></Skillsheet>
				<Questionaire v-on:resp="set_responses($event)"></Questionaire>
				<Disclaimer></Disclaimer>
				<button v-on:click.prevent="submit">Submit</button>
			</div>
			<div v-if="form.complete">
				Thanks for submititng your application for our conference scholarship!<br>
				Stay updated with the Machine Intelligence Community<br>
				<SocialLinks></SocialLinks>
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'

// Reg components
import AuthService from '@/services/AuthenticationService'
import RegistrationService from '@/services/RegistrationService.js'
import RegProfile from '@/components/conference/registration/RegProfile.vue'
import Dietary from '@/components/conference/registration/Dietary.vue'
import Skillsheet from '@/components/conference/registration/Skillsheet.vue'
import Questionaire from '@/components/conference/registration/Questionaire.vue'
import Disclaimer from '@/components/form/Disclaimer'
import SocialLinks from '@/components/form/SocialLinks'

export default {
	components: {
		PageNav,
		Disclaimer,
		SocialLinks,
		RegProfile,
		Dietary,
		Skillsheet,
		Questionaire
	},
	data() {
		return {
			form: {
				error: undefined,
				complete: false
			},
			reqs: [
				'Applying for this scholarship will also apply you for the conference even if you are not selected for this scholarship.',
				'You must be at least 18 years old to apply.',
				'Must be from an underrerepresented group.'
			]
		}
	},
	methods: {
		update_profile(data) {
			console.log(profile);
		}
	}
}
</script>

<style>
label {
	font-size: 13px;
	font-weight: 600;
	margin-right: 1em;
}

</style>