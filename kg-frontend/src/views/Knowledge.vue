<template>
	<div class="knowledge">
		<PageNav></PageNav>
		<h2>Add a New Blog Post</h2>
		<form>
			<lable>Blog Title:</lable>
			<input type="text" v-model.lazy="Title" required/>
			<label>Blog Content:</label>
			<textarea v-mode.lazy="Content"></textarea>
		</form>
		<div id="preview">
			<h3>Preview Blog</h3>
			<p>Blog Title: </p>
			<p>Blog Content:</p>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedArticle from '@/components/LinkedArticle.vue'

export default {
	name: 'knowledge',
	components: {
		PageNav,
	},

	data () {
		return {
			formData: {}
		}
	},

	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		}
	}
}
</script>

<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

</style>
