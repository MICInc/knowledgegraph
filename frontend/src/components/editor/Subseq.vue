<template>
	<div id="subseq">
		<TypeAhead :placeholder="'Subsequent'" v-on:node="update($event)"></TypeAhead>
		<ul>
			<li v-for="(title, index) in subseq">{{ title }}<button v-on:click="remove(index)">x</button></li>
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
		}
	},
	methods: {
		remove(index) {
			this.subseq.splice(index, 1);
		},
		update(node) {
			if(!this.subseq.includes(node)) {
				this.subseq.splice(0, 0, node);
				this.$emit('update', this.subseq);
			}
		}
	},
	props: ['subseq']
}
</script>

<style scoped>
button {
	border: none;
}

#subseq {
	width: 50%;
	float: left;
	margin: 0;
}

#subseq ul li button {
	margin-left: auto;
	margin: 0 0 5px 0;
}
</style>