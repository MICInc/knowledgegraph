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

export default {
	name: 'search',
	components: {
		PageNav,
	},

	data () {
		return {
			id: this.$route.params.id,
			results: []
		}
	},

	created() {
		this.$http.get('127.0.0.1:7000/search/'+this.id).then(function(data){
			return data.json();
		}).then(function (data){
			var searchResults = [];
			for(let key in data) {
				data[key].id = key;
				searchResults.push(data[key]);
			}
			this.results = searchResults;
		});
	},

	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
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
