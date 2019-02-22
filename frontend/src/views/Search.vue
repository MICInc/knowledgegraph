<template>
	<div class="search">
		<PageNav></PageNav>
		<h3>Results</h3>
		<ul>
			<li v-for='item in results'>
				<router-link v-bind:to="'/kg/'+item.url">{{ item.title }}</router-link>
			</li>
		</ul>
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
		this.search().then(data => {
			console.log(data);
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

.input-row {
	display: flex;
	align-items: center;
}

</style>
