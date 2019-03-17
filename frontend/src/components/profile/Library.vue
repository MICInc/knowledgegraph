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
			library: [],
			token: this.$store.state.userInfo.token,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_library() {
			ProfileService.get_library({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
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