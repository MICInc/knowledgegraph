<template>
	<div class="container">
		<h2>COMMENTS</h2>
		<ul>
			<li v-for="(comment, index) in comments">{{ comment }}</li>
		</ul>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Comments',
	beforeMount() {
		this.get_comments();
	},
	data() {
		return {
			editable: false,
			comments: [],
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_comments() {
			ProfileService.get_comments({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
				this.editable = resp.data.editable;
				this.comments = resp.data.comments;
			})
			.catch((data) => {

			});
		}
	}
}
</script>

<style>
</style>