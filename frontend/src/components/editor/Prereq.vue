<template>
	<div id="prereq">
		<TypeAhead :placeholder="'Prerequisites'" v-on:node="update($event)"></TypeAhead>
		<ul>
			<li v-for="(title, index) in prereq">{{ title }}<button v-on:click="remove(index)">x</button></li>
		</ul>
	</div>
</template>

<script>
import TypeAhead from '@/components/editor/TypeAhead.vue'

export default {
	components: {
		TypeAhead
	},
	data() {
		return {
		}
	},
	methods: {
		remove(index) {
			this.prereq.splice(index, 1);
		},
		update(node) {
			if(!this.prereq.includes(node)) {
				this.prereq.splice(0, 0, node);
				this.$emit('update', this.prereq);
			}
		}
	},
	props: ['prereq']
}
</script>

<style scoped>
button {
	border: none;
}

#prereq {
	width: 50%;
	float: left;
	margin: 0;
}

#prereq ul li button {
	margin-left: auto;
	margin: 0 0 5px 0;
}
</style>