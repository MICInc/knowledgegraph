<template>
	<div class="main">
		<PageNav></PageNav>
		<div class="container" v-if="check_content()">
			<h2>{{ content.title }}</h2>
			<!-- <a class="edit" v-bind:href="'/content/'+content.title.toLowerCase()+'/edit'">EDIT</a> -->
			<div id="article-info">
				<h3 id="authors">Authors</h3>
				<span class='authors' v-for='author in content.authors'>{{ author }} </span>
				<div v-for="c in content.content">
					<hr v-if="c.tag == 'hr'">
					<p v-if="c.tag == 'p'" v-html="c.html"></p>
					<figure v-if="c.tag == 'img'">
						<img :src="c.src">
						<figcaption>{{ c.caption }}</figcaption>
					</figure>
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
import SearchService from '@/services/SearchService'
import Footer from '@/components/Footer'
import NotFoundMsg from '@/components/NotFoundMsg'
import Buffer from 'safe-buffer'
import FS from 'fs'
import router from '@/router'

export default {
	name: 'content',
	beforeMount() {
		this.get_content().then(data => {
			this.content_id = data._id;
			this.content = data;
			console.log(data);
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
			edit_url: ''
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
		check_content() {
			return this.content != null && this.content.constructor === Object && Object.keys(this.content).length > 0;
		},
		search(term) {
			router.push({path: 'search', query: {term: term} })
		}
	}
}
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}

.container {
	width: 600px;
	display: inline-block;
	flex-direction: column;
	align-items: center;
}

#authors {
	font-size: 0.85em;
	margin-bottom: 0px;
}

.authors {
	font-size: 0.85em;
}

.edit {
	font-size: 0.85em;
	font-weight: bold;
}

#bibtex {
	font-size: 0.85em;
}

#bibtex h4 {
	margin-bottom: 0px;
}

</style>
