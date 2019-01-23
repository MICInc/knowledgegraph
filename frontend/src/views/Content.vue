<template>
	<div class="content main">
		<PageNav></PageNav>
		<div v-if="this.content != null && this.content.constructor === Object && Object.keys(this.content).length > 0" class="container">
			<h2>{{ content.title }}</h2>
			<div id="article-info">
				<h3 id="authors">Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }} </span>
				<div v-for="c in content.content">
					<p v-if="c.tag == 'p'" v-html="c.html"></p>
					<img v-if="c.tag == 'img'" :src="c.src">
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
import Buffer from 'safe-buffer'
import FS from 'fs'

export default {
	name: 'content',
	beforeMount() {
		this.get_content().then(data => {
			this.content_id = data._id;
			this.content = data;
		});
	},
	components: {
		PageNav,
		Footer,
		NotFoundMsg
	},
	data () {
		return {
			content_id: '',
			url: this.$route.params.id,
			content: {},
		}
	},
	methods: {
		async get_content() {
			return await ContentService.getContent({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			})
			.catch(function(error) {
				console.log('Page not found');
			});
		}
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
