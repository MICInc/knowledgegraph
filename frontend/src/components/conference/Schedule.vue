<template>
	<div class="container">
		<div id="archive">
			<h2>Schedule</h2>
			<ul>
				<li v-for="(conf, index) in archive">
					<a :href="'/conference/schedule/'+conf.year">{{ conf.year }}</a>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
export default{
	data() {
		return {
			archive: [ { year: 2018 } ]
		}
	}
}
</script>

<style>
</style>