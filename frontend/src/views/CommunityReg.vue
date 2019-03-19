<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="community-reg" v-if="!form.complete">
			<ReadMe></ReadMe>
			<form id="community-reg-form" autocomplete="off" v-on:keydown.enter="prevent_default($event)">
				<School
					:error="form.error.school"
					v-on:update="update($event)">
				</School>
				<Organization
					:school="org.school"
					:err_name="form.error.name"
					:err_aff="form.error.affiliation"
					:err_est="form.error.established"
					v-on:update="update($event)">
				</Organization>
				<Executives 
					:error="form.error.execs"
					v-on:update="update($event)">
				</Executives>
				<Advisors v-on:update="update($event)"></Advisors>
				<button v-on:click.prevent="submit">Submit</button>
			</form>
		</div>
		<div class="community-reg" v-if="form.complete">
			Thank you for completing this form.
		</div>
	</div>
</template>

<script>
import CommunityService from '@/services/CommunityService';
import PageNav from '@/components/PageNav'
import ReadMe from '@/components/community/registration/ReadMe'
import School from '@/components/community/registration/School'
import Organization from '@/components/community/registration/Organization'
import Executives from '@/components/community/registration/Executives'
import Advisors from '@/components/community/registration/Advisors'

export default {
	name: 'community-reg',
	components: {
		PageNav,
		ReadMe,
		School,
		Organization,
		Executives,
		Advisors
	},
	data() {
		return {
			form: {
				error: {
					advisors: false,
					affiliation: false,
					established: false,
					execs: false,
					exists: false,
					name: false,
					school: false
				},
				complete: false
			},
			org: {
				advisors: [],
				affiliation: {},
				established: '',
				execs: [],
				exists: '',
				name: '',
				school: ''
			},
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		prevent_default(event) {
			event.preventDefault()
		},
		set_advisors(advisors) {
			this.org.advisors = advisors;
		},
		set_execs(execs) {
			this.org.execs = execs;
		},
		set_org(data) {
			this.org.affiliation = { contact: data.contact }
			this.org.established = data.established;
			this.org.name = data.name;
		},
		set_school(name) {
			this.org.school = name;
		},
		async submit() {
			CommunityService.submitCommunity({ organization: this.org, token: this.token, email: this.email })
			.then((resp) => {
				var err = resp.data.error;
				
				if(err != undefined && resp.status == 200) this.form.error = err;
				else if (resp.status == 200) this.form.complete = true;
			});
		},
		update(data) {
			for(var k in data) this.org[k] = data[k];
		}
	}
}
</script>
<style scoped>

#body {
	margin: 0px 30%; 
}

h2 {
	color: #593c75;
}

button {
	background: #502984;
	color: #FFF;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 100%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	background: #331a54;
	color: #FFF;
}

.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
}

.community-reg {
	margin-top: 10px;
}

label {
	font-size: 1em;
	font-weight: 600;
}

.section-heading {
	color: #593c75;
	font-size: 1.5em;
	cursor: pointer;
}

.form-button {
	margin-bottom: 15px;
}

form {
	display: flex;
	flex-direction: column;
	align-items: baseline;
}

.form-sect {
	margin-bottom: 1em;
}

.name {
	display: flex;
	flex-direction: column;
}

.full-width {
	width: 100%;
}

input {
	margin-right: 10px;
	border: none;
	max-width: 100%;
}

.name div {
	display: flex;
}

.core-exec {
	margin-right: 0px;
	width: 110px;
}

.core-exec::placeholder {
	color: black;
}

.more-execs-sect {
	background: black
}

.more-execs {
	width: 23%;
	margin-left: 0px;
	margin-right: 0px;
}

.advisor-field {
	margin-right: 0px;
	margin-left: 0px;
	width: 31%;
}

.field-header {
	font-size: 1em;
}

#schools {
	font-size: 1em;
}

.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}

</style>