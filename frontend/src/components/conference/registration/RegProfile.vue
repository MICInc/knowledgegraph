<template>
	<div>
		<span v-if="!$store.state.isLoggedIn">
			<FirstName
				:error="form.error.first_name.ok"
				v-on:first_name="set_first_name($event)">
			</FirstName>
			<LastName
				:error="form.error.last_name.ok"
				v-on:last_name="set_last_name($event)">
			</LastName>
			<label v-if="has_name">Hey {{ profile.first_name }} {{ profile.last_name }}, nice to meet you.</label>
			<DOB 
				:error="form.error.dob.ok"
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
			<Authentication
				:err_email="form.error.email"
				:err_pwd="form.error.password.ok"
				:err_pwd_conf="form.error.confirm_pw.ok"
				v-on:email="set_email($event)"
				v-on:password="set_pwd($event)"
				v-on:confirm_pwd="set_conf_pwd($event)">
			</Authentication>
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
	</div>
</template>

<script>
import AuthService from '@/services/AuthenticationService'
import FirstName from '@/components/conference/registration/FirstName.vue'
import LastName from '@/components/conference/registration/LastName.vue'
import DOB from '@/components/conference/registration/DOB.vue'
import Gender from '@/components/conference/registration/Gender.vue'
import Ethnicity from '@/components/conference/registration/Ethnicity.vue'
import Authentication from '@/components/conference/registration/Authentication.vue'
import Affiliation from '@/components/conference/registration/Affiliation.vue'
import SchoolField from '@/components/form/SchoolField'
import AcademicYear from '@/components/conference/registration/AcademicYear.vue'

export default {
	name: 'RegProfile',
	components: {
		FirstName,
		LastName,
		DOB,
		Gender,
		Ethnicity, 
		Authentication,
		Affiliation,
		SchoolField,
		AcademicYear
	},
	computed: {
		has_name: function() {
			var is_null = this.profile.first_name == null || this.profile.last_name == null;
			return !is_null && this.profile.first_name.length > 0 && this.profile.last_name.length > 0;
		}
	},
	data() {
		return {
			form: {
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
				}
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
			year: (new Date()).getFullYear()
		}
	},
	methods: {
		set_aff(aff) {
			this.profile.affiliation = aff;
		},
		set_dob(date) {
			this.profile.dob = date;
		},
		set_email(email) {
			this.profile.email = email;
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
		set_last_name(name) {
			this.profile.last_name = name;
		},
		set_pwd(pwd) {
			this.profile.password = pwd;
		},
		set_conf_pwd(pwd) {
			this.profile.confirm_pw = pwd;
		},
		update(data) {
			this.profile.school = data;
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
						reimbursements: null 
					};
			
					this.$emit('ok', reg);
				}
			});
		}
	}
}
</script>

<style>
</style>