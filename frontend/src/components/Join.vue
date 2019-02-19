<template>
	<div id="join">
		<form v-on:submit.prevent="handleSubmit">
			<p>{{error}}</p>
			<div class="input-row">
				<input type="text" placeholder="First Name" v-model.trim="profile.first_name.value" required>
				<input type="text" placeholder="Last Name" v-model.trim="profile.last_name.value" required>
			</div>
			<input type="email" placeholder="Email" v-model.trim="profile.email.value" required>
			<label>Gender:</label>
			<select name="gender" placeholder="Gender" v-model="profile.gender.value">
				<option value="" disabled selected>Select your gender</option>
				<option v-for="gender in form.gender">{{ gender }}</option>
			</select>
			<label>Birthday</label><br>
			<DateSelector v-on:date="set_date($event)"></DateSelector>
			<input type="password" placeholder="Password" v-model="profile.password.value" required>
			<input type="password" placeholder="Confirm Password" v-model="profile.confirm_password.value" required>
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
			error: '',
			form: {
				gender: ['Female', 'Male', 'Non-binary']
			},
			profile: {
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
				first_name: {
					err: '',
					value: ''
				},
				gender: {
					err: '',
					value: ''
				},
				last_name: {
					value: ''
				},
				password: {
					value: ''
				}
			}
		}
	},

	methods: {
		set_date(date) {
			this.profile.dob.value = date;
		},

		submit() {
			if (this.profile.password.value != this.profile.confirm_password.value) {
				this.error = "Passwords don't match"
				return
			}

			this.signUpUser().then((response) => {
				if (response.data.error != undefined && response.status == 200) {
					this.error = response.data.error
				} else if (response.status == 200) {
					// Login newly created l=user
					this.$store.dispatch('login', response.data.token)
					router.push({ name: 'home' })
									
				} else {
					alert("Something went wrong.")
					console.log(response)
				}
			});
		},

		async signUpUser() {
			return await AuthService.signUpUser({
				email: this.profile.email.value, 
				firstname: this.profile.first_name.value,
				lastname: this.profile.last_name.value,
				passwordConf: this.profile.confirm_password.value,
				password: this.profile.password.value,
				dob: this.profile.dob.value,
				gender: this.profile.gender.value,
			})
		},
	}
}
</script>


<style scoped>

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
	border: none;
	background: #535353;
}

label, a {
	font-size: 12px;
}

</style>