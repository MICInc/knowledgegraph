<template>
	<div class="container">
		<PageNav></PageNav>
		<div id="search">
			<span id="result-count">results ({{results.length}})</span><br>
			<div>
				<ul>
					<li v-for='item in results'>
						<ArticleCell :item="item"></ArticleCell>
					</li>
				</ul>
				<ul>
					<li v-for='item in people'>
						<ProfileCell :item="item"></ProfileCell>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import SearchService from '@/services/SearchService'
import ArticleCell from '@/components/search/ArticleCell'
import ProfileCell from '@/components/search/ProfileCell'

export default {
	name: 'search',
	components: {
		PageNav,
		ArticleCell,
		ProfileCell
	},
	created() {
		this.query.term = this.$route.query.term;

		this.search().then(data => {
			if(data.content != null && data.content.length > 0) this.results = data.content;
			if(data.users != null && data.users.length > 0) this.people = data.users;
		});
	},
	data () {
		return {
			id: this.$route.params.id,
			results: [],
			people: [],
			query: {
				user: this.$store.state.userInfo != null ? this.$store.state.userInfo.id : '',
				term: ''
			},
			view: 'article',
			view_type: ['user', 'article']
		}
	},
	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		},
		reset() {
			this.people = [];
			this.results = [];
		},
		async search() {
			return await SearchService.search({params: this.query})
			.then(function(data) {
				return data.data;
			});
		}
	},
	watch: {
		$route (to, from) {
			this.reset();

			this.query.term = to.query.term;
			this.search().then(data => {
				this.results = data;
				console.log('here: ', this.results);
			});
		}
	} 
}
</script>

<style scoped>

#search {
	margin-top: 10px;
}

#result-count {
	margin: 20px 0px;
	font-size: 0.8em;
}

</style>
