<template>
	<div id="subseq">
		<h4>Subsequent</h4>
		<ul>
			<li v-for='item in concepts'>
				<a :href="'/content/'+item.href">{{ item.innerText }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Subseq',
	data() {
		return {
		}
	},
	props: ['concepts']
}
</script>

<style>
#subseq {
	width: 50%;
	float: right;
	margin: 0 0 3em 0;
}
</style>