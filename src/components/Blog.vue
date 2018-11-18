<template>
	<div id="add-blog">
		<h2>Add a New Blog Post</h2>
		<form>
			<lable>Blog Title:</lable>
			<input type="text" v-model.lazy:"blog.title" required/>
			<label>Blog Content:</label>
			<textarea v-mode.lazy="blog.content"></textarea>
		</form>
		<div id="preview">
			<h3>Preview Blog</h3>
			<p>Blog Title: {{ blog.title }}</p>
			<p>Blog Content:</p>
			<p>{{ blog.content }}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			blog: {
				title: "",
				content: ""
			}
		}	 
	},
	methods: {

	}
}
</script>

<style>
	body {
		margin: 0;
		font-family: 'Nunito SemiBold';
	}
</style>
