<template>
	<div id="join">
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input :class="{error: form.error.first_name }" type="text" placeholder="First Name" v-model.trim="profile.first_name" required>
				<input :class="{error: form.error.last_name }" type="text" placeholder="Last Name" v-model.trim="profile.last_name" required><br>
			</div>
			<input :class="{error: form.error.email }" type="email" placeholder="Email" v-model.trim="profile.email" required>
			<label>Gender:</label>
			<select :class="{error: form.error.gender }" name="gender" placeholder="Gender" v-model="profile.gender">
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select>
			<label>Birthday</label><br>
			<DateSelector :class="{error: form.error.dob }"  v-on:date="set_date($event)"></DateSelector>
			<input :class="{error: form.error.password }" type="password" placeholder="Password" v-model="profile.password" required>
			<input :class="{error: form.error.confirm_password }" type="password" placeholder="Confirm Password" v-model="profile.confirm_password" required>
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
	border-style: solid;
}

label, a {
	font-size: 12px;
}

</style>