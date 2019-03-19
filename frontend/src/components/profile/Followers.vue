<template>
	<div class="container">
		<h2>FOLLOWERS</h2>
		<ul>
			<li v-for="(follower, index) in followers"><a :href="'/'+follower.url">{{ follower.name }}</a></li>
		</ul>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Followers',
	beforeMount() {
		this.get_followers();
	},
	data() {
		return {
			editable: false,
			followers: [],
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		async get_followers() {
			ProfileService.get_followers({ params: { user_id: this.user_id, token: this.token, url: this.url, email: this.email }})
			.then((resp) => {
				this.editable = resp.data.editable;
				this.followers = resp.data.followers;
			})
			.catch((data) => {

			});
		}
	}
}
</script>

<style>
</style>