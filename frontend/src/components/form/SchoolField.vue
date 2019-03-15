<template>
	<div>
		<div class="autocomplete">
			<input type="text" v-model.trim="query" v-on:keyup="suggest($event)">
			<div v-show="query.length > 0">
				<ul>
					<li v-for="(school, index) in filter">{{ school.name }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import SearchService from '@/services/SearchService'

export default {
	name: 'school-type-ahead',
	computed: {
		filter: function() {
			var term = this.query;

			return this.schools.filter(function(school) {
				if(school.name != undefined) return school.name.match(new RegExp('('+term+')', 'i'));
				else return '';
			}).splice(0, 5);
		}
	},
	data() {
		return {
			schools: [],
			query: ''
		}
	},
	methods: {
		suggest(event) {
			SearchService.findSchool({ params: { name: this.query }})
			.then((resp) => {
				this.schools = resp.data;
			})
			.catch();
		}
	},
	props: ['error'],
	watch: {
		school: function(sel, prev) {
			this.$emit('school', sel);
		}
	}
}
</script>

<style>
.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}
</style>