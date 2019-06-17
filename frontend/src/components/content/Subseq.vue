<template>
	<div id="subseq">
		<h4>Subsequent</h4>
		<ul>
			<li v-for='item in concepts'>
				<router-link tag='a' :to="'/content/'+item">{{item}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Subseq',
	beforeMount() {
		//fetch data from backend
	},
	data() {
		return {
			concepts: []		
		}
	}
}
</script>

<style>
#subseq {
	width: 50%;
	float: right;
	margin: 0 0 3em 0;
}
</style>