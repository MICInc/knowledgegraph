<template>
	<div id="signup-form">
		<div>
			Please create an account to register for our conference.
			<p v-if="form.err.length > 0">{{ form.err }}</p>
		</div>
		<form v-if="form.show" enctype="multipart/form-data">
			<label>What's your first name?</label><br>
			<input type="text" placeholder="First name" v-model.trim="profile.first_name" required><br>
			<label>What's your last name?</label><br>
			<input type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
			<label v-if="profile.first_name.length > 0 && profile.last_name.length > 0">Hey {{ profile.first_name }} {{ profile.last_name}}, nice to meet you.</label>
			<div class="birthday">
				<label>Birthday</label><br>
				<label>Month: </label>
				<select name="month" v-model="profile.dob_month">
					<option v-for="(value, index) in form.months">{{ value }}</option>
				</select>
				<label>Day: </label>
				<select name="day" v-model.number="profile.dob_day">
					<option v-for="(value, index) in 31">{{ value }}</option>
				</select>
				<label>Year: </label>
				<select name="year" v-model.number="profile.dob_year">
					<option v-for="year in form.years">{{ year }}</option>
				</select>
			</div>
			<label>Where can we contact you?</label><br>
			<input type="text" value="email" placeholder="email" v-model.trim="profile.email"><br>
			<label>Password</label><br>
			<input type="password" value="password" placeholder="password" v-model="profile.password"><br>
			<label>Confirm password</label><br>
			<input type="password" value="password" placeholder="confirm password" v-model="profile.confirm_password"><br>
			<label>Affiliation</label><br>
			<ul>
				<li v-for="affiliation in form.affiliation">
					<input type="radio" v-bind:value="affiliation" v-model="profile.affiliation">{{ affiliation }}
				</li>
			</ul>
			<label>What school do you attend?</label><br>
			<select name="school" v-model="profile.school">
				<option v-for="school in form.schools">{{ school.name }}</option>
			</select><br>
			<label>What grade will you be in Fall of 2018? (e.g. 2nd Year Undergraduate)</label><br>
			<select name="grade" v-model="profile.grade">
				<option v-for="grade in form.academic_year">{{ grade }}</option>
			</select><br>
			<label>Gender</label><br>
			<select name="gender" v-model="profile.gender">
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select><br>
			<label>What is your ethnicity?</label><br>
			<select name="ethnicity" v-model="profile.ethnicity">
				<option v-for="ethnicity in form.ethnicity">{{ ethnicity }}</option>
			</select><br>
			<label>Please list any food you're allergic to:</label><br>
			<input v-model.trim="conf_reg.food_allergens"></input><br>
			<label>Opt-in to share your resume with sponsors</label><br>
			<input type="file" name="resume" multiple v-on:change="add_file($event, 'resume')"><br>
			Do you need travel and lodging assistance? <button v-on:click.prevent="reveal_travel">Show</button><br>
			<div id="travel-form" v-if="form.travel">
				<ul id="reimbursement-notice">
					<li>Completing this form does not guarantee travel or lodging reimbursements.</li>
					<li>Receipts must be uploaded for this form to be considered complete.</li>
					<li>Receipts must match the amount requested for reimbursements.</li>
					<li>Please view your profile for reimbursement status</li>
				</ul>
				<label>Travel and Lodging Reimbursement Form</label><br>
				<input type="text" v-model.trim="reimburse.address" placeholder="Receipient's Address"><br>
				<label>Travel</label><br>
				<span v-for="(value, index) in reimburse.travel">
					<input type="text" v-model.trim="reimburse.travel[index].date" placeholder="Date">
					<input type="text" v-model.trim="reimburse.travel[index].src" placeholder="Source">
					<input type="text" v-model.trim="reimburse.travel[index].dest" placeholder="Destination">
					<input type="text" v-model.number="reimburse.travel[index].amount" v-on:keyup="total" placeholder="Amount ($ USD)">
					<input type="file" name="travel-receipt" multiple v-on:change="add_file($event, 'travel')"><br>
				</span><br>
				<button v-on:click.prevent="extend_form('travel')">+</button><br>
				<label>Hotel</label><br>
				<span v-for="(value, index) in reimburse.hotel">
					<input type="text" v-model.trim="reimburse.hotel.name" placeholder="Hotel"><br>
					<input type="text" v-model.trim="reimburse.hotel.nights" placeholder="Nights"><br>
					<input type="text" v-model.trim="reimburse.hotel.check_in" placeholder="Check in date">
					<input type="text" v-model.trim="reimburse.hotel.check_out" placeholder="Check out date">
					<input type="text" v-model.number="reimburse.hotel[index].amount" v-on:keyup="total" placeholder="Amount ($ USD)">
					<input type="file" name="hotel-receipt" multiple v-on:change="add_file($event, 'hotel')"><br>
				</span><br>
				<button v-on:click.prevent="extend_form('hotel')">+</button><br>
				<br>
				<label>Miscellaneous</label><br>
				<span v-for="(value, index) in reimburse.misc">
					<input type="text" v-model.trim="reimburse.misc.name" placeholder="Item"><br>
					<input type="text" v-model.number="reimburse.misc[index].amount" v-on:keyup="total" placeholder="Amount ($ USD)">
					<input type="file" name="misc-receipt" multiple v-on:change="add_file($event, 'misc')"><br>
				</span><br>
				<button v-on:click.prevent="extend_form('misc')">+</button><br>
				<label>Total: $ {{ reimburse.total }}</label><br>
				<button v-on:click.prevent="reveal_travel">Hide</button>
			</div>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea v-model.trim="conf_reg.message"></textarea><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<div v-if="!selected" class="action-buttons">
			<router-link to="/login" tag="button">Login</router-link>
			<button v-on:click.prevent="reveal_form">Register</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import ProfileService from '../services/ProfileService.js'
import RegistrationService from '../services/RegistrationService.js'
import ContentService from '@/services/ContentService.js'
import institutions from '@/data/schools.json'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',
	data() {
		return {
			selected: false,
			conf_reg: {
				food_allergens: '',
				message: '',
				resume: undefined
			},
			form: {
				affiliation: ['MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor'],
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
					'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				err: '',
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				gender: ['Female', 'Male', 'Non-binary'],
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				schools: institutions,
				show: false,
				travel: false,
				years: years(100, (new Date()).getFullYear())
			},
			profile: {
				affiliation: '',
				confirm_password: '',
				dob_day: 0,
				dob_month: 0,
				dob_year: 0,
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
				address: '',
				travel: [{
					amount: 0,
					date: '',
					dest: '',
					src: '',
					receipt: undefined
				}],
				hotel: [{
					amount: 0,
					check_in: '',
					check_out: '',
					name: '',
					receipt: {}
				}],
				misc: [{
					amount: 0,
					item: '',
					receipt: {}
				}],
				total: '0'
			}
		}
	},
	methods: {
		add_file(event, type, index) {
			var file = event.target.files[0];

			if(type == 'resume') {
				this.conf_reg.resume = file;
			}
			else if(type == 'travel') {
				this.reimburse.travel.receipt = file;
			}
			else if(type == 'hotel') {
				this.reimburse.hotel.receipt = file;
			}
			else {
				this.reimburse.misc.receipt = file;
			}
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
		create_formdata() {
			var data = new FormData();
			
			for(var i = 0; i < this.reimburse.travel.length; i++) {
				data.append('travel-'+i, this.reimburse.travel[i]);
			}
			
			for(var i = 0; i < this.reimburse.hotel.length; i++) {
				data.append('hotel-'+i, this.reimburse.hotel[i]);
			}

			for(var i = 0; i < this.reimburse.misc.length; i++) {
				data.append('misc-'+i, this.reimburse.misc[i]);
			}

			return data;
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
		is_string(data) {
			return (typeof data === 'string' || data instanceof String);
		},
		reveal_form() {
			this.form.show = !this.form.show;
			this.selected = true;
		},
		reveal_travel() {
			this.form.travel = !this.form.travel;
		},
		round(amount) {
			return parseFloat(Math.round(amount * 100) / 100);
		},
		submit() {
			// Add more valdation here
			if(this.vali_date()) {
				this.form.err = '';
				var files = this.create_formdata();

				var config = {
					header: {
						'Content-Type' : 'multipart/form-data'
					}
				}

				Promise.all([ProfileService.createProfile(this.profile), 
							 RegistrationService.registerConf(this.conf_reg),
							 ContentService.uploadFile('/conference/upload', files, config)]);
			}
			else {
				this.form.err = 'Please enter a valid birthday.';
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
			var year = this.profile.dob_year;
			var month = this.form.months.indexOf(this.profile.dob_month);
			var day = this.profile.dob_day;
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

</style>
