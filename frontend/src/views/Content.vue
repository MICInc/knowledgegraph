<template>
	<div class="content main">
		<PageNav></PageNav>
		<div v-if="this.content != null && this.content.constructor === Object && Object.keys(this.content).length > 0" class="container">
			<h2>{{ content.title }}</h2>
			<div id="article-info">
				<h3 id="authors">Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }} </span>
				<div v-for="c in content.content">
					<p v-if="c.tag.toLowerCase() == 'p'" v-html="c.html"></p>
					<img v-if="c.tag.toLowerCase() == 'img'" :src="get_image(c.name)">
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
			content: {},
			img_src: ''
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
		},
		async get_image(name) {
			return await ContentService.getImage({ params: { content_id: this.content._id, name: name }})
			.then(data => {
				var image = Buffer.Buffer.from(data.data, 'binary').toString('base64');
				console.log(`data:${data.headers['content-type'].toLowerCase()};base64,${image}`);
				return `data:${data.headers['content-type'].toLowerCase()};base64,${image}`;
			})
			.catch(function(error) {
				console.log(error);
			});
		}
	},

	beforeMount() {
		this.get_content().then(data => {
			this.content = data;
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
