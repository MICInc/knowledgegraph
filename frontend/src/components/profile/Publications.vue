<template>
	<div class="container">
		<h2>PUBLICATIONS</h2>
		<ul>
			<li v-for="(article, index) in publications">
				<div>
					<a :href="'/content/'+article.url">{{ article.title }}</a><span>{{ article.year }}</span><br>
					<p>{{ article.preview }}</p>
					<button v-if="editable">x</button>
				</div>
			</li>
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
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id
		}
	},
	methods: {
		async get_publications() {
			var user = { user_id: this.user_id, token: this.token, url: this.url, email: this.$store.state.userInfo.email };
			ProfileService.get_publications({ params: user })
			.then((resp) => {
				this.editable = resp.data.editable;
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