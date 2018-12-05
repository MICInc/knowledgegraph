<template>
	<div id="signup_form">
		<div>
			Please create an account to register for our conference.
		</div>
		<form v-if="form.show" enctype="multipart/form-data">
			<label>What's your first name?</label><br>
			<input type="text" placeholder="First name" v-model.trim="profile.first_name" required><br>
			<label>Hey {{ profile.first_name }}, nice to meet you. What's your last name?</label><br>
			<input type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
			<div>
				<label>Birthday</label><br>
				<label>Year: </label>
				<select name="year" v-model.number="profile.dob_year">
					<option v-for="year in form.years">{{ year }}</option>
				</select>
				<label>Month: </label>
				<select name="month" v-model.number="profile.dob_month">
					<option v-for="(value, index) in 12">{{ value }}</option>
				</select>
				<label>Day: </label>
				<select name="day" v-model.number="profile.dob_day">
					<option v-for="(value, index) in 31">{{ value }}</option>
				</select>
			</div>
			<label>Where can we contact you?</label><br>
			<input type="text" value="email" placeholder="email" v-model.trim="profile.email"><br>
			<label>Password</label><br>
			<input type="password" value="password" placeholder="password" v-model="profile.password"><br>
			<label>Confirm password</label><br>
			<input type="password" value="password" placeholder="confirm password" v-model="profile.confirm_password"><br>
			<span>Affiliation</span><br>
			<ul>
				<li v-for="affiliation in form.affiliation">
					<input type="radio" v-bind:value="affiliation" v-model="profile.affiliation">{{ affiliation }}
				</li>
			</ul>
			<label>What school do you attend?</label><br>
			<select name="school" v-model="profile.school">
				<option v-for="school in form.schools">{{ school }}</option>
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
			<button v-on:click.prevent="upload_resume">Upload</button><br>
			Do you need travel and lodging assistance? <button v-on:click.prevent="reveal_travel">Show</button><br>
			<div id="travel-form" v-if="form.travel">
				<label>Travel and Lodging Reimbursement Form</label><br>
				<input type="text" v-model.trim="reimburse.address" placeholder="Receipient's Address"><br>
				<label>Travel</label><br>
				<span v-for="(value, index) in reimburse.travel">
					<input type="text" v-model.trim="reimburse.travel[index].date" placeholder="Date">
					<input type="text" v-model.trim="reimburse.travel[index].src" placeholder="Source">
					<input type="text" v-model.trim="reimburse.travel[index].dest" placeholder="Destination">
					<input type="text" v-model.number="reimburse.travel[index].cost" placeholder="Amount ($ USD)"
					v-on:keyup.enter="add_travel(index)">
					<input type="file" :ref="'receipt-'+index" multiple v-on:change="reimburse.travel[index].receipt"><br>
				</span><br>
				<label>Hotel</label><br>
				<input type="text" v-model.trim="reimburse.hotel.name" placeholder="Hotel"><br>
				<input type="text" v-model.trim="reimburse.hotel.nights" placeholder="Nights"><br>
				<input type="text" v-model.trim="reimburse.hotel.check_in" placeholder="Check in date">
				<input type="text" v-model.trim="reimburse.hotel.check_out" placeholder="Check out date">
				<input type="text" v-model.number="reimburse.hotel.amount" placeholder="Total amount ($ USD)">
				<br>
				<label>Miscellaneous</label><br>
				<input type="text" v-model.trim="reimburse.misc.name" placeholder="Item"><br>
				<input type="text" v-model.trim="reimburse.misc.amount" placeholder="Amount ($ USD)"><br>
			</div>
			<label>Total: $ {{ reimburse.total }}</label><br>
			<label>What do you want out of this conference and anything else we should know?</label><br>
			<textarea v-model.trim="conf_reg.message"></textarea><br>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<router-link to="/login" tag="button">Login</router-link>
		<button v-on:click.prevent="reveal_form">Register</button>
	</div>
</template>

<script>
import axios from 'axios'
import ProfileService from '../services/ProfileService.js'
import RegistrationService from '../services/RegistrationService.js'

var years = function range(size, today) {
	return [...Array(size).keys()].map(i => today - i);
}

export default {
	name: 'signup_form',

	data() {
		return {
			conf_reg: {
				food_allergens: '',
				message: '',
				reimbursements: {}
			},
			form: {
				affiliation: ['MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor'],
				academic_year: ['Not in school', 'Elementary school', 'Middle school', 'High school',
					'Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Postdoc'],
				ethnicity: ['African', 'Asian', 'European', 'Hispanic', 'Multiracial', 'Native American', 'Pacific Islander'],
				gender: ['Female', 'Male', 'Non-binary'],
				schools: ['Boston University'],
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
					amount: '',
					date: '',
					dest: '',
					src: '',
					receipt: ''
				}],
				hotel: [{
					amount: 0,
					check_in: '',
					check_out: '',
					name: '',
					receipt: ''
				}],
				misc: [{
					amout: 0,
					item: '',
				}],
				total: 0
			}
		}
	},

	methods: {
		add_travel(index) {
			var next = index + 1;
			this.reimburse.travel.splice(next, 0, {});
			this.reimburse.total = this.sum();
		},
		create_formdata() {
			let files = new FormData();

			for (var i = 0; i < this.reimburse.length; i++) {
				files.append('receipt-'+i, this.reimburse.travel[i].receipt);
			}
			console.log(files);
			return files;
		},
		submit() {
			this.conf_reg.reimbursements = this.create_formdata();
			RegistrationService.registerConf(this.conf_reg);
			// Promise.all([ProfileService.createProfile(this.profile), RegistrationService.registerConf(this.conf_reg)]);
		},
		sum() {
			
		},
		reveal_form() {
			this.form.show = !this.form.show;
		},
		reveal_travel() {
			this.form.travel = !this.form.travel;
		},
		upload_resume() {

		}
	}
}
</script>

<style>
</style>