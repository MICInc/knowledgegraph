<template>
	<div class="add-article">
		<PageNav></PageNav>
		<h2>Add a new article</h2>
		<form>
			<label>Title</label>
			<input type="text" v-model="article.title" required/>
			<label>Content</label>
			<textarea v-model="article.content"></textarea>
		</form>
		<div id="preview">
			<h3>Preview</h3>
			<p>Title {{ article.title }}</p>
			<p placeholder="Content..." >Content {{ article.content }}</p>
			<button v-on:click.prevent="submit">Submit</button>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'

export default {
	name: 'add-article',
	components: {
		PageNav,
	},

	data () {
		return {
			article: {
				title: "",
				content: ""
			}
		}
	},

	methods: {
		submit() {
			alert(this.article.content)
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
