<template>
	<div class="content main">
		<PageNav></PageNav>
		<div class="container">
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


</style>
