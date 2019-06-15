<template>
	<div id="prereq">
		<h4>Prerequisites</h4>
		<ul>
			<li v-for='item in concepts'>
				<router-link tag='a' :to="'/content/'+item">{{item}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Prereq',
	beforeMount() {
		//fetch data from backend
	},
	data() {
		return {
			concepts: ['Probability', 'Bayes Rule']
		}
	}
}
</script>

<style>
#prereq {
	width: 50%;
	float: left;
	margin: 0 0 3em 0;
}
</style>