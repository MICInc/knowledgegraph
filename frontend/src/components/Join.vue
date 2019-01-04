<template>
	<div id="join">
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input type="text" placeholder="First Name" v-model.trim="profile.first_name.value" required>
				<input type="text" placeholder="Last Name" v-model.trim="profile.last_name.value" required>
			</div>
			<input type="email" placeholder="Email" v-model.trim="profile.email.value" required>
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
import ProfileService from '@/services/ProfileService'
import DateSelector from '@/components/DateSelector'

export default {
	name: 'join',
	components: {
		DateSelector
	},
	data () {
		return {
			form: {
				gender: ['Female', 'Male', 'Non-binary']
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
			}
		}
	},

	methods: {
		set_date(date) {
			this.profile.dob.value = date;
		},
		submit() {
			ProfileService.createProfile(this.profile)
			.then(function(data) {
				alert(data);
			});
		}
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
