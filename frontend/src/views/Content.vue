<template>
	<div class="content main">
		<PageNav></PageNav>
		<div class="container">
			<h2>{{ content.title }}</h2>
			<div id="abstract">
				<h3>Abstract</h3>
				<p class='abstract'></p>
				<h3>Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }}, </span>
				<h3>Original</h3>
				<span class='citation'><a v-bind:href='content.original_url'>Original</a></span>
				<div id='related-work'>
					<h3>Related work</h3>
					<ul>
						<li v-for='work in content.related'>
							<router-link v-bind:to="'/article/'+work.url">{{ work.title }}</router-link>
						</li>
					</ul>
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
			console.log(data);
		});
	}
}
</script>

<style scoped>


</style>
