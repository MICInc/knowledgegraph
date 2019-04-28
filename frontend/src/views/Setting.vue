<template>
	<div class="container">
		<PageNav></PageNav>
		<Profile
			v-on:url="update_url($event)"
			v-on:first_name="update_first_name($event)"
			v-on:last_name="update_last_name($event)"
			v-on:email="update_email($event)">
		</Profile>
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
import FadeBlock from '@/components/form/FadeBlock'
import AuthenticationService from '@/services/AuthenticationService'
import AuthMixin from '@/mixins/AuthMixin'
import router from '@/router'

export default {
	name: 'settings',
	components: {
		PageNav,
		Profile,
		Password,
		Deactivate,
		FadeBlock
	},
	data() {
		return {
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		update_url(data) {
			ProfileService.update_url({
				token: this.token, 
				email: this.email, 
				url: data.url })
			.then((resp) => {
				var data = resp.data;
				if(data.url.length > 0) this.$store.commit('setURL', data.url);

				alert('Profile URL updated');
			})
			.catch((error) => {
				alert(error);
			});
		},
		update_first_name(data) {
			ProfileService.update_first_name({
				token: this.token, 
				email: this.email, 
				first_name: data.first_name })
			.then((resp) => {
				var data = resp.data;
				if(data.first_name.length > 0) this.$store.commit('setFirstName', data.first_name);

				alert('First name updated');
			})
			.catch((error) => {
				alert(error);
			});
		},
		update_last_name(data) {
			ProfileService.update_last_name({
				token: this.token, 
				email: this.email, 
				last_name: data.last_name })
			.then((resp) => {
				var data = resp.data;
				if(data.last_name.length > 0) this.$store.commit('setLastName', data.last_name);

				alert('Last name updated');
			})
			.catch((error) => {
				alert(error);
			});
		},
		update_email(data) {
			ProfileService.update_email({
				token: this.token, 
				email: this.email, 
				data: data.email })
			.then((resp) => {
				var data = resp.data;

				if(data.email.length > 0) this.$store.commit('setEmail', data.email);
				if(data.token.length > 0) this.$store.commit('setAccessToken', data.token);

				alert('Email updated');
			})
			.catch((error) => {
				alert(error);
			});
		},
		update_password(data) {
			ProfileService.update_password({
				token: this.token, 
				email: this.email,
				data: data })
			.then((resp) => {
				alert('Updated password');
			})
			.catch((error) => {
				alert(error);
			});
		},
		deactivate(data) {
			ProfileService.deactivate({ 
				token: this.token,
				email: this.email,
				data: data })
			.then((resp) => {
				alert('Deactivated account');
			})
			.catch((error) => {
				alert(error);
			});
		}
	},
	mixins: [AuthMixin]
}
</script>

<style scoped>
</style>