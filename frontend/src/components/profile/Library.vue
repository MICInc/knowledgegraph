<template>
	<div class="container">
		<h2>LIBRARY</h2>
		<ul>
			<li v-for="(article, index) in library"><a :href="'/content/'+article.url">{{ article.title }}</a></li>
		</ul>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Library',
	beforeMount() {
		this.get_library();
	},
	data() {
		return {
			editable: false,
			library: [],
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_library() {
			var user = { user_id: this.user_id, token: this.token, url: this.url, email: this.$store.state.userInfo.email };
			ProfileService.get_library({ params: user })
			.then((resp) => {
				this.editable = resp.data.editable;
				this.library = resp.data.library;
			})
			.catch((data) => {

			});
		}
	}
}
</script>

<style>
</style>