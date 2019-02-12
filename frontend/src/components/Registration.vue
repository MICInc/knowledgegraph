<template>
	<div id="signup-form">
		<div>
			Please create an account to register for our conference.
		</div>
		<form v-if="form.show" enctype="multipart/form-data">
			<button v-on:click.prevent="reveal_form">Hide form</button><br>
			<label>What's your first name?</label><br>
			<p class="error" v-if="profile.first_name.err.length > 0">{{ profile.first_name.err }}</p>
			<input type="text" placeholder="First name" v-model.trim="profile.first_name.value" required><br>
			<label>What's your last name?</label><br>
			<p class="error" v-if="profile.last_name.err.length > 0">{{ profile.last_name.err }}</p>
			<input type="text" placeholder="Last name" v-model.trim="profile.last_name.value" required><br>
			<label v-if="profile.first_name.value.length > 0 && profile.last_name.value.length > 0">Hey {{ profile.first_name.value }} {{ profile.last_name.value }}, nice to meet you.</label>
			<div class="birthday">
				<label>Birthday</label><br>
				<DateSelector v-on:date="set_dob($event)"></DateSelector>
			</div>
			<label>Where can we contact you?</label><br>
			<p class="error" v-if="profile.email.err.length > 0">{{ profile.email.err }}</p>
			<input type="text" value="email" placeholder="email" v-model.trim="profile.email.value"><br>
			<label>Password</label><br>
			<p class="error" v-if="profile.password.err.length > 0">{{ profile.password.err }}</p>
			<input type="password" value="password" placeholder="password" v-model="profile.password.value"><br>
			<label>Confirm password</label><br>
			<input type="password" value="password" placeholder="confirm password" v-model="profile.confirm_password.value"><br>
			<label>Affiliation</label><br>
			<p class='error' v-if="profile.affiliation.err.length > 0">{{ profile.affiliation.err }}</p>
			<ul>
				<li v-for="affiliation in form.affiliation">
					<input type="radio" v-bind:value="affiliation" v-model="profile.affiliation.value">{{ affiliation }}
				</li>
			</ul>
			<label>What school do you attend?</label><br>
			<p class="error" v-if="profile.school.err.length > 0">{{ profile.school.err }}</p>
			<select name="school" v-model="profile.school.value">
				<option v-for="school in form.schools">{{ school.name }}</option>
			</select><br>
			<label>What grade will you be in Fall of 2018? (e.g. 2nd Year Undergraduate)</label><br>
			<p class="error" v-if="profile.grade.err.length > 0">{{ profile.grade.err }}</p>
			<select name="grade" v-model="profile.grade.value">
				<option v-for="grade in form.academic_year">{{ grade }}</option>
			</select><br>
			<label>Gender</label><br>
			<p class="error" v-if="profile.gender.err.length > 0">{{ profile.gender.err }}</p>
			<select name="gender" v-model="profile.gender.value">
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select><br>
			<label>What is your ethnicity?</label><br>
			<p class="error" v-if="profile.ethnicity.err.length > 0">{{ profile.ethnicity.err }}</p>
			<select name="ethnicity" v-model="profile.ethnicity.value">
				<option v-for="ethnicity in form.ethnicity">{{ ethnicity }}</option>
			</select><br>
			<label>Please list any food you're allergic to:</label><br>
			<input v-model.trim="conf_resp.food_allergens"></input><br>
			<label>Opt-in to share your resume with sponsors</label><br>
			<input type="file" name="resume" multiple v-on:change="add_file($event, 0, 'resume')"><br>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea v-model.trim="conf_resp.message"></textarea><br>
			<button v-on:click.prevent="reveal_form">Hide form</button><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import ProfileService from '../services/ProfileService.js'
import RegistrationService from '../services/RegistrationService.js'
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
				message: '',
			},
			form: {
				affiliation: ['MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor'],
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
					'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				data: new FormData(),
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				gender: ['Female', 'Male', 'Non-binary'],
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				schools: institutions,
				show: true,
				travel: false,
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				affiliation: {
					err: '',
					value: ''
				},
				confirm_password: {
					err: '',
					value: ''
				},
				dob: {
					err: '',
					value: undefined
				},
				email: {
					err: '',
					value: ''
				},
				ethnicity: {
					err: '',
					value: ''
				},
				first_name: {
					err: '',
					value: ''
				},
				gender: {
					err: '',
					value: ''
				},
				grade: {
					err: '',
					value: ''
				},
				last_name: {
					err: '',
					value: ''
				},
				password: {
					err: '',
					value: ''
				},
				school: {
					err: '',
					value: ''
				}
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
		add_file(event, index, type) {
			var file = event.target.files[0];
			var filename = file.name;

			if(type == 'resume') {
				this.conf_resp.resume = filename;
				this.form.data.append('resume', file, filename);
			}
			else if(type == 'travel') {
				this.reimburse.travel.receipt = filename;
				this.form.data.append('travel_'+index, file, filename);
			}
			else if(type == 'hotel') {
				this.reimburse.hotel.receipt = filename;
				this.form.data.append('hotel_'+index, file, filename);
			}
			else if(type == 'misc') {
				this.reimburse.misc.receipt = filename;
				this.form.data.append('misc_'+index, file, filename);
			}
		},
		daysInMonth(month, year) {
			// original: https://stackoverflow.com/questions/1433030/validate-number-of-days-in-a-given-month/1433119#1433119
			switch (month) {
				case 1 :
					return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
				case 8 : case 3 : case 5 : case 10 :
					return 30;
				default :
					return 31
			}
		},
		delete_item(type, index) {
			if(type == 'travel') {
				this.reimburse.travel.splice(index, 1);
			}
			else if(type == 'hotel') {
				this.reimburse.hotel.splice(index, 1);
			}
			else if(type == 'misc') {
				this.reimburse.misc.splice(index, 1);
			}

			this.total();
		},
		extend_form(type) {

			if(type == 'travel') {
				this.reimburse.travel.push({});
			}
			else if(type == 'hotel'){
				this.reimburse.hotel.push({});
			}
			else {
				this.reimburse.misc.push({});
			}
		},
		is_complete(data) {
			var keys = Object.keys(data);

			if(data.amount > 0) {
				for(var i = 0; i < keys.length; i++) {
					if(this.is_empty(data[keys[i]])) {
						return false;
					}
				}
			}

			return true;
		},
		is_empty(data) {
			return ((typeof data == 'string' || data instanceof String) && data.length == 0) || data == 0;
		},
		is_list_complete(data) {
			var complete = true;

			for(var i = 0; i < data.length; i++) {
				complete = complete && this.is_complete(data[i]);
			}

			return complete;
		},
		is_string(data) {
			return (typeof data === 'string' || data instanceof String);
		},
		profile_complete() {
			console.log('checking profile');
			var keys = Object.keys(this.profile);
			var flag = true;

			for(var i = 0; i < keys.length; i++) {
				var k = keys[i];
				if(k != 'dob') {
					var v = this.profile[k].value;

					if(this.is_empty(v)) {
						this.profile[k].err = 'Missing '+k;
						flag = false;
					}
				}
			}

			return flag;
		},
		registration_complete() {
			return this.is_complete(this.reimburse.address) &&
			this.is_list_complete(this.reimburse.travel) &&
			this.is_list_complete(this.reimburse.hotel) &&
			this.is_list_complete(this.reimburse.misc);
		},
		reveal_form() {
			this.form.show = !this.form.show;
		},
		reveal_travel() {
			this.form.travel = !this.form.travel;
		},
		round(amount) {
			return parseFloat(Math.round(amount * 100) / 100);
		},
		set_dob(date) {
			this.profile.dob.value = date;
		},
		set_travel_date(index, date) {
			this.reimburse.travel[index].date = date;
		},
		set_checkin_date(index, date) {
			this.reimburse.hotel[index].check_in = date;
		},
		set_checkout_date(index, date) {
			this.reimburse.hotel[index].check_out = date;
		},
		set_misc_date(index, date) {
			this.reimburse.misc[index].date = date;
		},
		submit() {

			if(!this.vali_date()) {
				this.profile.dob.err = 'Please enter a valid birthday.';
			}

			if(this.registration_complete()) {
				console.log('Submitting completed registration');

				// if(this.profile_complete()) {
					// ProfileService.createProfile(this.profile).then(function(data) {
					// 	console.log(data);
					// 	if(this.user_id.length == 0) {
					// 		// this.user_id = data.
					// 	}
					// });

					// this.reveal_form();
				// }

				var reg = {'profile': this.profile, 'reimbursements': this.reimburse, 'conf_resp': this.conf_resp};

				RegistrationService.register(reg).then(function(data) {
					console.log(data);
				});
			}		
		},
		sum(data) {
			var total = 0;

			for (var i = 0; i < data.length; i++) {
				total += this.round(data[i].amount);
			}

			if (this.is_string(total)) {
				total = 0;
			}

			return total;
		},
		total() {
			var travel = this.sum(this.reimburse.travel);
			var hotel = this.sum(this.reimburse.hotel);
			var misc = this.sum(this.reimburse.misc);

			this.reimburse.total = (travel + hotel + misc).toFixed(2);;
		},
		vali_date() {
			var year = this.profile.dob.year;
			var month = this.form.months.indexOf(this.profile.dob.month);
			var day = this.profile.dob.day;

			return month >= 0 && month < 12 && day > 0 && day <= this.daysInMonth(month, year)
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
}

.birthday select {
	margin-right: 10px;
}

#reimbursement-notice {
	list-style-type: circle;
	font-size: .9em;
	margin: 10px 15px;
}

.error {
	color: red;
}

</style>