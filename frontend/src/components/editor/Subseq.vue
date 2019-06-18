<template>
	<div id="subseq">
		<TypeAhead :placeholder="'Subsequent'" v-on:node="update($event)"></TypeAhead>
		<ul>
			<li v-for="(title, index) in subseq">{{ title }}</li>
		</ul>
	</div>
</template>

<script>
import TypeAhead from '@/components/editor/TypeAhead.vue';

export default {
	components: {
		TypeAhead
	},
	data() {
		return {
			subseq: []
		}
	},
	methods: {
		update(node) {
			if(!this.subseq.includes(node)) this.subseq.splice(0, 0, node);
		}
	}
}
</script>

<style>
#subseq {
	width: 50%;
	float: right;
	margin: 0;
}

#subseq ul {
	height: 100%;
	width: 95%;
	z-index: -1;
}
</style>