<template>
	<div class="linked-content-wrapper">
		<h2><router-link tag="a" v-bind:to="{path: '/content/' + content.url}">{{content.title}}</router-link></h2><br>
		<div class="preview">{{ content.preview }}</div>
		<p class="author">Author: {{ content.authors[0].first_name }} {{ content.authors[0].last_name }}</p>
	</div>
</template>

<script>
export default {
	name: 'LinkedContent',
	props: {
		content: Object,
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h2 {
	margin: 0;
	font-size: 15px;
	font-weight: 500;
}

h2 a {
	text-decoration: none;
}

.linked-content-wrapper {
	margin: 1em 0 0.5em 0;
	font-size: 12px;
}

</style>