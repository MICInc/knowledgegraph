<template>
	<div id="join">
		<form v-if="form.show" v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input :class="{error: form.error.first_name }" type="text" placeholder="First name" v-model.trim="profile.first_name" required>
				<input :class="{error: form.error.last_name }" type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
			</div>
			<label>Gender</label>
			<select :class="{error: form.error.gender }" name="gender" placeholder="Gender" v-model="profile.gender">
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select><br>
			<label>Birthday</label>
			<span :class="{error: form.error.dob }">
				<DateSelector v-on:date="set_date($event)"></DateSelector>
			</span>
			<input 
				:class="{error: form.error.email }" 
				type="email" 
				placeholder="Email" 
				v-model.trim="profile.email"
				autocomplete="username"
				required>
			<div class="input-row">
				<input 
					:class="{error: form.error.password }" 
					type="password" 
					placeholder="Password" 
					v-model="profile.password" 
					autocomplete="new-password"
					required>
				<input 
					:class="{error: form.error.confirm_password }" 
					type="password" 
					placeholder="Confirm password" 
					v-model="profile.confirm_password" 
					autocomplete="new-password"
					required>
			</div>
			<Disclaimer></Disclaimer>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<div v-else>
			<h3 class='receipt'>Please check your email for a verification link.</h3>
		</div>
	</div>
</template>

<script>
import DateSelector from '@/components/form/DateSelector'
import AuthService from '@/services/AuthenticationService'
import Disclaimer from '@/components/form/Disclaimer'
import router from '@/router'

export default {
	name: 'join',
	components: {
		DateSelector,
		Disclaimer
	},
	data () {
		return {
			form: {
				error: {
					first_name: false,
					last_name: false,
					email: false,
					gender: false,
					dob: false,
					password: false,
					confirm_password: false
				},
				gender: ['Female', 'Male', 'Non-binary'],
				show: true,
				submitted: false
			},
			profile: {
				confirm_password: '',
				dob: '',
				email: '',
				first_name: '',
				gender: '',
				last_name: '',
				password: ''
			}
		}
	},
	methods: {
		set_date(date) {
			this.profile.dob = date;
		},
		submit() {
			this.signup().then((response) => {
				var err = response.data.error;

				if(err != undefined && response.status == 200) {
					this.form.error = err;
				} else if (response.status == 200) {
					// Login newly created l=user
					// this.$store.dispatch('login', [response.data.token, response.data.userInfo]);
					this.form.submitted = true;
					this.form.show = false;
				}
			});
		},
		async signup() {
			return await AuthService.sign_up(this.profile);
		},
	}
}
</script>


<style scoped>
.receipt {
	margin-top: 50%;
}

.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}

.input-row {
	display: flex;
	align-items: center;
}

.input-row input {
	width: calc(50% - 8px);
}

.input-row input:first-child {
	margin-right: 4px;
}

.input-row input:last-child {
	margin-left: 4px;
}

label {
	color: #606060;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 300px;
	margin: 80px 0 0 0;
}

input {
	margin: 5px 0;
	padding: 5px;
	border: transparent;
}

label, a {
	font-size: 12px;
}

button {
	background: transparent;
	color: #502984;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 100%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	border-color: #502984;
}

</style>