<template>
	<div>
		<div class="autocomplete">
			<input type="text" v-model.trim="query" v-on:keyup="suggest($event)">
			<div v-show="show">
				<ul>
					<li v-for="(name, index) in filter">{{ name }}</li>
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
			return this.schools.filter(function(name) {
				return name.match(new RegExp('('+term+')', 'i'));
			});
		}
	},
	data() {
		return {
			schools: ['Boston University', 'Massachusetts Institute of Technology'],
			query: '',
			show: false
		}
	},
	methods: {
		suggest(event) {
			this.show = true;
			SearchService.findSchool({ params: this.query })
			.then((resp) => {
				console.log(resp.data);
				// this.schools = resp;
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