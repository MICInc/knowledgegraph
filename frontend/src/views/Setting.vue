<template>
	<div class="container">
		<PageNav></PageNav>
		<Profile v-on:profile="update_profile($event)"></Profile>
		<Password v-on:password="update_password($event)"></Password>
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
		update_password(data) {
			ProfileService.update_password({
				token: this.token, 
				email: this.email,
				data: data })
			.then((resp) => {
				if(resp.err) alert('Password change unsuccessful');
			})
			.catch((resp) => {

			});
		},
		update_profile(data) {
			ProfileService.update_profile({
				token: this.token, 
				email: this.email, 
				data: data })
			.then((resp) => {
				if(resp.err) alert('Profile change unsuccessful');
				this.$store.commit('setEmail', resp.data.email);
				this.$store.commit('setURL', resp.data.url);
				console.log(this.$store.state.userInfo);
			})
			.catch((error) => {
				console.log(error);
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