<template>
	<div id="prereq">
		<h4>Prerequisites</h4>
		<ul>
			<li v-for='item in concepts'>
				<a :href="'/content/'+item.href">{{ item.innerText }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Prereq',
	data() {
		return {
		}
	},
	props: ['concepts']
}
</script>

<style>
#prereq {
	width: 50%;
	float: left;
	margin: 0 0 3em 0;
}
</style>