<template>
	<div class="linked-content-wrapper">
		<div class="left">
			<h2><router-link tag="a" v-bind:to="content.url">{{content.title}}</router-link></h2>
			<p>{{content.description}}</p>
			<p>{{content.content}}</p>
			<div class="actions">
				<div class="liked">{{content.num_likes}} Liked</div>
				<div class="shared">{{content.num_shares}} shared</div>
				<div class="comments">{{content.num_comments}} comments</div>
			</div>
		</div>
		<div class="right">
			<img src="https://picsum.photos/300/200/?random">
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

.linked-content-wrapper {
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