<template>
	<div id="prereq">
		<h2>Prerequisites</h2>
		<input v-model="new_pre" v-on:keydown.enter="add($event)" placeholder="add prereq">
		<ul>
			<li v-for="item in prereq">
				<route-link tag='a' :to="'/content/'+item">{{item}}</route-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prereq: [],
			new_pre: ''
		}
	},
	methods: {
		add() {
			prereq.push(this.new_pre);
			this.new_pre = '';
		}
	}
}
</script>

<style>
#prereq {
	width: 50%;
	float: left;
	margin: 0;
}
</style>