<template>
	<div>
		<div class="autocomplete">
			<input 
				class="school-input"
				type="text" 
				v-model.trim="query"
				v-on:keyup="suggest($event)"
				v-on:keyup.esc="clear()">
			<div class="typeahead" v-show="has_suggestions">
				<ul>
					<li v-for="(school, index) in filter" v-on:click="select(school.name)">{{ school.name }}</li>
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
			query: '',
			has_suggestions: false
		}
	},
	methods: {
		clear() {
			this.query = '';
			this.schools = [];
			this.has_suggestions = false;
		},
		select(school) {
			this.query = school;
			this.has_suggestions = false;
		},
		suggest(event) {
			if(event.which == 27) return;

			SearchService.find_school({ params: { name: this.query }})
			.then((resp) => {
				this.schools = resp.data;
				this.has_suggestions = this.schools.length > 0;
			})
			.catch();
		}
	},
	props: ['error'],
	watch: {
		query: function(sel, prev) {
			this.$emit('school', sel);
		}
	}
}
</script>

<style scoped>
.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}

.autocomplete {
	width: flex;
}

.school-input {
	width: 50%;
}

.typeahead {
	width: 50%;
	border: solid;
	border-width: 1px;
	border-top: none;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	border-color: #ccc;
}

.typeahead ul li:hover {
	background-color: #ccc;
}
</style>