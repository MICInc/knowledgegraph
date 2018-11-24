<template>
	<div id="signup">
		<PageNav></PageNav>
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input type="text" placeholder="First Name" v-model="profile.first_name" required>
				<input type="text" placeholder="Last Name" v-model="profile.last_name" required>
			</div>
			<input type="email" placeholder="Email" v-model="profile.email" required>
			<input type="password" placeholder="Password" v-model="profile.password" required>
			<input type="password" placeholder="Confirm Password" v-model="profile.confirm_password" required>
		</form>
		<button v-on:click.prevent="submit">Submit</button>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ProfileService from '../services/ProfileService.js'

export default {
	name: 'signup',
	components: {
		PageNav
	},

	data () {
		return {
			profile: {
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				confirm_password: ""
			}
		}
	},

	methods: {
		submit() {
			ProfileService.createProfile(this.profile)
			.then(function(data){
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

</style>
