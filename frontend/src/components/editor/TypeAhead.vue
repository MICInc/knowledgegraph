<template>
	<div>
		<div class="autocomplete">
			<input 
				class="node-input"
				type="text" 
				v-model.trim="query"
				v-on:keyup="suggest($event)"
				v-on:keyup.esc="clear()"
				:placeholder="placeholder">
			<div class="typeahead" v-show="has_suggestions">
				<ul>
					<li v-for="(node, index) in filter" v-on:click="select(node.title)">{{ node.title }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import SearchService from '@/services/SearchService'

export default {
	name: 'type-ahead',
	computed: {
		filter: function() {
			var term = this.query;

			return this.results.filter(function(node) {
				if(node.title != undefined) return node.title.match(new RegExp('('+term+')', 'i'));
				else return '';
			}).splice(0, 5);
		}
	},
	data() {
		return {
			results: [],
			query: '',
			has_suggestions: false
		}
	},
	methods: {
		clear() {
			this.query = '';
			this.results = [];
			this.has_suggestions = false;
		},
		select(node) {
			this.has_suggestions = false;
			this.$emit('node', node);
		},
		suggest(event) {
			if(event.which == 27) return;
			if(this.query.length == 0) {
				this.clear();
				return;
			}

			SearchService.find_node({ params: { title: this.query }})
			.then((resp) => {
				this.results = resp.data;
				this.has_suggestions = this.results.length > 0;
			})
			.catch();
		}
	},
	props: ['error', 'placeholder']
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

.node-input {
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

.typeahead ul {
	background-color: #fff;
}

.typeahead ul li:hover {
	background-color: #ccc;
}
</style>