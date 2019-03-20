<template>
	<div class="container">
		<h2>FOLLOWING</h2>
		<ul>
			<li v-for="(user, index) in following"><a :href="'/'+user.url">{{ user.first_name }} {{ user.last_name }}</a></li>
		</ul>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Following',
	beforeMount() {
		this.get_following();
	},
	data() {
		return {
			editable: false,
			following: [],
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id,
			email: this.$store.state.userInfo.email
		}
	},
	methods: {
		async get_following() {
			ProfileService.get_following({ params: { user_id: this.user_id, token: this.token, url: this.url, email: this.email }})
			.then((resp) => {
				this.editable = resp.data.editable;
				this.following = resp.data.following;
			})
			.catch((data) => {

			});
		}
	}
}
</script>

<style>
</style>