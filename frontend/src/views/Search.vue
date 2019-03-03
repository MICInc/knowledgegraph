<template>
	<div id="search">
		<PageNav></PageNav>
		<div id="search-body">
			<span id="result-count">results ({{results.length}})</span><br>
			<ul>
				<li v-for='item in results'>
					<ArticleCell :item="item"></ArticleCell>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import SearchService from '@/services/SearchService'
import ArticleCell from '@/components/ArticleCell'

export default {
	name: 'search',
	components: {
		PageNav,
		ArticleCell
	},
	created() {
		this.query.term = this.$route.query.term;

		this.search().then(data => {
			this.results = data;
		});
	},
	data () {
		return {
			id: this.$route.params.id,
			results: [],
			query: {
				user: this.$store.state.userInfo != null ? this.$store.state.userInfo.id : '',
				term: ''
			},
		}
	},
	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		},
		async search() {
			return await SearchService.search({params: this.query})
			.then(function(data) {
				return data.data;
			});
		}
	},
	watch: {
    	$route (to, from){
        	this.query.term = to.query.term;
        	this.search().then(data => {
				this.results = data;
			});
    	}
	} 
}
</script>

<style scoped>

#search-body {
	margin: 0px 10%;
}

#result-count {
	margin: 20px 0px;
	font-size: 0.8em;
}

</style>
