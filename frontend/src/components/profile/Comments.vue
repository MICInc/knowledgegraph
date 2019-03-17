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
	beforeMounted() {
		this.get_comments();
	},
	data() {
		return {
			comments: []
		}
	},
	methods: {
		async get_comments() {
			ProfileService.get_comments({ user_id: this.user_id, token: this.token })
			.then((resp) => {
				console.log(resp.data.comments);
				this.comments = resp.data.comments;
			})
			.catch((data) => {

			});
		}
	},
	props: ['user_id', 'token']
}
</script>

<style>
</style>