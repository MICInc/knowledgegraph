<template>
	<div class="container">
		<h2>PUBLICATIONS</h2>
		<ul>
			<li v-for="(article, index) in publications"><a :href="'/content/'+article.url">{{ article.title }}</a></li>
		</ul>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Publications',
	beforeMount() {
		this.get_publications();
	},
	data() {
		return {
			publications: [],
			token: this.$store.state.userInfo.token,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_publications() {
			ProfileService.get_publications({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
				this.publications = resp.data.publications;
			})
			.catch((data) => {

			});
		}
	}
}
</script>

<style>
</style>