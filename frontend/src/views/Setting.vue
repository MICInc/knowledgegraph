<template>
	<div class="container">
		<PageNav></PageNav>
		<Profile v-on:profile="update_profile($event)"></Profile>
		<Password v-on:password="change_password($event)"></Password>
		<Deactivate v-on:deactivate="deactivate($event)"></Deactivate>
		<router-view></router-view>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import ProfileService from '@/services/ProfileService'
import Password from '@/components/settings/Password'
import Profile from '@/components/settings/Profile'
import Deactivate from '@/components/settings/Deactivate'

export default {
	name: 'settings',
	components: {
		PageNav,
		Profile,
		Password,
		Deactivate
	},
	data() {
		return {
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		change_password(data) {
			ProfileService.change_password({
				token: this.token, 
				email: this.email,
				data: data })
			.then((resp) => {
				if(resp.err) alert('Password change unsuccessful');
			})
			.catch((resp) => {

			});
		},
		change_profile(data) {
			ProfileService.change_email({
				token: this.token, 
				email: this.email, 
				data: data })
			.then((resp) => {
				if(resp.err) alert('Email change unsuccessful');
			})
			.catch((resp) => {

			});
		},
		deactivate(data) {
			ProfileService.deactivate({ 
				token: this.token,
				email: this.email,
				data: data })
			.then((resp) => {
				if(resp.err) alert('Could not deactivate');
			})
			.catch((error) => {
				alert(error);
			});
		}
	}
}
</script>

<style scoped>
</style>