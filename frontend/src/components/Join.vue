<template>
	<div id="join">
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input :class="{error: form.error.first_name }" type="text" placeholder="First name" v-model.trim="profile.first_name" required>
				<input :class="{error: form.error.last_name }" type="text" placeholder="Last name" v-model.trim="profile.last_name" required><br>
			</div>
			<label>Gender</label>
			<select :class="{error: form.error.gender }" name="gender" placeholder="Gender" v-model="profile.gender">
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select><br>
			<label>Birthday</label>
			<DateSelector :class="{error: form.error.dob }"  v-on:date="set_date($event)"></DateSelector>
			<input :class="{error: form.error.email }" type="email" placeholder="Email" v-model.trim="profile.email" required>
			<div class="input-row">
				<input :class="{error: form.error.password }" type="password" placeholder="Password" v-model="profile.password" required>
				<input :class="{error: form.error.confirm_password }" type="password" placeholder="Confirm password" v-model="profile.confirm_password" required>
			</div>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
	</div>
</template>

<script>
import DateSelector from '@/components/DateSelector'
import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'join',
	components: {
		DateSelector
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
				gender: ['Female', 'Male', 'Non-binary']
			},
			profile: {
				confirm_password: '',
				dob: undefined,
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
					this.$store.dispatch('login', response.data.token)
					router.push({ name: 'home' })	
				}
			});
		},
		async signup() {
			return await AuthService.signUpUser(this.profile);
		},
	}
}
</script>


<style scoped>
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

</style>