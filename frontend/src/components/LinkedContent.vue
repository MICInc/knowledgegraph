<template>
	<div class="linked-content-wrapper">
		<h2><router-link tag="a" v-bind:to="{path: '/content/' + content.url}">{{content.title}}</router-link></h2>
		<div class="actions">
			<div class="liked">{{content.num_likes}} Liked</div>
			<div class="shared">{{content.num_shares}} shared</div>
			<div class="comments">{{content.num_comments}} comments</div>
		</div>
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
	
.actions {
	display: flex;
	font-size: 12px;
}

.actions div {
	margin-right: 10px;
}

.actions div:last-child {
	margin-right: 0;
} 

</style>