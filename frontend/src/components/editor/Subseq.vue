<template>
	<div id="subseq">
		<h2>Subsequent</h2>
		<input v-model="new_pre" v-on:keydown.enter="add($event)" placeholder="add subseq">
		<ul>
			<li v-for='item in subseq'>
				<router-link tag='a' :to="'/content/'+item">{{item}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			subseq: [],
			new_sub: ''
		}
	},
	methods: {
		add() {
			subseq.push(this.new_sub);
			this.new_sub = '';
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
</style>