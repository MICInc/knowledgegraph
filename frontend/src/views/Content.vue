<template>
	<div class="content main">
		<PageNav></PageNav>
		<div v-if="Object.keys(this.content).length > 0 && this.content.constructor === Object" class="container">
			<h2>{{ content.title }}</h2>
			<div id="abstract">
				<h3>Abstract</h3>
				<p class='abstract'></p>
				<h3>Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }} </span>
				<div v-for="c in content.content">
					<p v-html="c.html"></p>
				</div>
			</div>
			<div id="bibtex" class="meta-info">
				<h4>BibTeX citation</h4>
				<p>bibtex</p>
			</div>
			<Footer></Footer>
		</div>
		<div v-else id="article-not-found">
			<h2>404: Article not found</h2>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ContentService from '@/services/ContentService'
import Footer from '@/components/Footer'

export default {
	name: 'content',
	components: {
		PageNav,
		Footer
	},

	data () {
		return {
			url: this.$route.params.id,
			content: {}
		}
	},

	methods: {
		async getContent() {
			return await ContentService.getContent({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			});
		}
	},

	beforeMount() {
		this.getContent().then(data => {
			this.content = data;
			console.log(this.content);
		});
	}
}
</script>

<style scoped>

#article-not-found {
	width: 300px;
	height: 300px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
}
</style>
