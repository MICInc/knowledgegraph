<template>
	<div class="content main">
		<PageNav></PageNav>
		<div v-if="Object.keys(this.content).length > 0 && this.content.constructor === Object" class="container">
			<h2>{{ content.title }}</h2>
			<div id="article-info">
				<h3 id="authors">Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }} </span>
				<div v-for="c in content.content">
					<p v-html="c.html"></p>
				</div>
			</div>
			<div id="bibtex" class="meta-info">
				<h4>BibTeX citation</h4>
				<span>bibtex</span>
			</div>
			<Footer></Footer>
		</div>
		<NotFoundMsg v-else></NotFoundMsg>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ContentService from '@/services/ContentService'
import Footer from '@/components/Footer'
import NotFoundMsg from '@/components/NotFoundMsg'

export default {
	name: 'content',
	components: {
		PageNav,
		Footer,
		NotFoundMsg
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
#authors {
	font-size: 0.85em;
	margin-bottom: 0px;
}

.authors {
	font-size: 0.85em;
}

#bibtex {
	font-size: 0.85em;
}

#bibtex h4 {
	margin-bottom: 0px;
}

</style>
