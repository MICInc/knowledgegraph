<template>
	<div id="prereq">
		<h2>Prerequisites</h2>
		<input v-model="new_pre" v-on:keydown.enter="add()" placeholder="add prereq">
		<ul>
			<li v-for="item in prereq">
				<router-link tag='a' :to="'/content/'+item">{{item}}</router-link>
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
			this.prereq.splice(this.prereq.length-1, 0, this.new_pre);
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