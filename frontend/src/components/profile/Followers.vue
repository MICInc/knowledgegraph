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
			followers: [],
			token: this.$store.state.userInfo.token,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_followers() {
			ProfileService.get_followers({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
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