<template>
	<div id="add-blog">
		<h2>Add a New Blog Post</h2>
		<form>
			<lable>Blog Title:</lable>
			<input type="text" required/>
			<label>Blog Content:</label>
			<textarea></textarea>
		</form>
		<div id="preview">
			<h3>Preview Blog</h3>
			<p>Blog Title:</p>
			<p>Blog Content:</p>
		</div>
	</div>
</template>
<script>
	export default {
	data() {
		return {

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
