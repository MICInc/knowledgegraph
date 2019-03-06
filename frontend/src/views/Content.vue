<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container" v-if="check_content()">
			<h2>{{ content.title }}</h2>
			<Vote :likes="content.num_likes" :dislikes="content.num_dislikes" :content_id="content_id"></Vote>
			<label>citations </label>
			<span>{{ content.num_citations }}</span>
			<div id="article-info">
				<h3 id="authors">Authors</h3>
				<span class='authors' v-for='author in content.authors'><a :href="'/profile/'+author.url">{{ author.first_name+' '+author.last_name }}</a></span>
				<div v-for="c in content.content">
					<hr v-if="c.tag == 'hr'">
					<p v-if="c.tag == 'p'" v-html="c.html"></p>
					<figure v-if="c.tag == 'img'">
						<img class="image-content" :src="c.src">
						<figcaption class="caption">{{ c.caption }}</figcaption>
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
import PageNav from '@/components/PageNav'
import ContentService from '@/services/ContentService'
import Footer from '@/components/Footer'
import NotFoundMsg from '@/components/NotFoundMsg'
import Vote from '@/components/Vote'

export default {
	name: 'Content',
	created() {
		// window.addEventListener('beforeunload', this.cleanup);
	},
	beforeMount() {
		// window.addEventListener('beforeunload', this.cleanup);
		if(this.$store.state.isLoggedIn) this.user = this.$store.state.userInfo.id;

		this.get_content().then(data => {
			this.content_id = data._id;
			this.content = data;
		});
	},
	components: {
		PageNav,
		Footer,
		NotFoundMsg,
		Vote
	},
	data () {
		return {
			content_id: '',
			url: this.$route.params.id,
			content: {},
			user: ''
		}
	},
	methods: {
		async get_content() {
			return await ContentService.getContent({ params: { user: this.user, url: this.url } })
			.then(function(data) {
				return data.data;
			})
			.catch(function(error) {
				console.log('Page not found');
			});
		},
		check_content() {
			return this.content != null && this.content.constructor === Object && Object.keys(this.content).length > 0;
		},
		// cleanup() {
		// 	ContentService.cleanup({ 
		// 		user: this.$store.state.userInfo != null ? this.$store.state.userInfo.id : '',
		// 		content_id: this.content_id
		// 	});
		// }
	}
}
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}

.caption {
	text-align: center;
	font-size: 0.8em;
	color: #606060;
}

.image-content {
	display: block;
	margin: auto;
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle; 
	border: 1px solid transparent;
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
