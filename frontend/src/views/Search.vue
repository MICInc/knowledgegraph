<template>
	<div id="search">
		<PageNav></PageNav>
		<div id="search-body">
			<span id="result-count">results ({{results.length}})</span><br>
			<ul>
				<li v-for='item in results'>
					<div class="result">
						<router-link class="result-header" v-bind:to="'/content/'+item.url">{{ item.title }}</router-link>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import SearchService from '@/services/SearchService'

export default {
	name: 'search',
	components: {
		PageNav,
	},
	created() {
		this.query.term = this.$route.query.term;
		console.log(this.query.term);
		this.search().then(data => {
			console.log(data);
			this.results = data;
		});
	},
	data () {
		return {
			id: this.$route.params.id,
			results: [],
			query: {
				term: ''
			}
		}
	},
	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		},
		async search() {
			console.log(this.query.term);
			return await SearchService.search({params: this.query})
			.then(function(data) {
				return data.data;
			});
		}
	}
}
</script>

<style scoped>

#search-body{
	margin: 0px 10%;
}

.input-row {
	display: flex;
	align-items: center;
}

.result {
	border-bottom: solid;
	border-width: thin;
	border-color: #e5e5e5;
	width: 50%;
	height: 80px;
	margin: 10px 0px;
}

.result-header {
	font-size: 1.2em;
	font-weight: bold;
}

#result-count {
	margin: 20px 0px;
	font-size: 0.8em;
}

</style>
