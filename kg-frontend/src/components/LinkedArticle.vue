<template>
	<div class="linked-article-wrapper">
		<div class="left">
			<h2>{{article.title}}</h2>
			<p>{{article.description}}</p>
			<div class="actions">
				<div class="liked">{{article.num_liked}} Liked</div>
				<div class="shared">{{article.num_shared}} shared</div>
				<div class="comments">{{article.num_comments}} comments</div>
			</div>
		</div>
		<div class="right">
			<img src="https://picsum.photos/300/200/?random">
		</div>
	</div>
</template>

<script>
export default {
	name: 'LinkedArticle',
	props: {
		article: Object,
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.linked-article-wrapper {
	display: flex;
	max-width: 600px;
	height: 200px;
	border: 1px solid #000;
	margin-bottom: 25px;
}

.left, .right {
	width: 300px;
}

.left {
	padding: 10px;
}

.actions {
	display: flex;
}

.actions div {
	margin: 5px 5px;
}

.actions div:first-child {
	margin-left: 0;
}



</style>
