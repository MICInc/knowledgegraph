<template>
	<div class="container">
		<PageNav></PageNav>
		<Profile></Profile>
		<Password></Password>
		<router-view></router-view>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import ProfileService from '@/services/ProfileService'
import Password from '@/components/settings/Password'
import Profile from '@/components/settings/Profile'

export default {
	name: 'settings',
	components: {
		PageNav,
		Profile,
		Password
	},
	data() {
		return {
			new_pw: '',
			new_pw_confirm: '',
			new_email: '',
			token: this.$store.state.accessToken,
			user_id: this.$store.state.userInfo.id,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		change_password() {
			ProfileService.change_password({
				token: this.token, 
				email: this.email,
				new_pw: this.new_pw, 
				new_pw_confirm: this.new_pw_confirm })
			.then((resp) => {
				if(resp.err) alert('Password change unsuccessful');
			})
			.catch((resp) => {

			});
		},
		change_email() {
			ProfileService.change_email({
				token: this.token, 
				email: this.email, 
				new_email: this.new_email }, data)
			.then((resp) => {
				if(resp.err) alert('Email change unsuccessful');
			})
			.catch((resp) => {

			});
		}
	}
}
</script>

<style scoped>
</style>