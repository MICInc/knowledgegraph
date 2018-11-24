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
		</div>
		<div id="citations">
			<h3>Citations</h3>
			<textarea v-model="article.citations"></textarea>
		</div>
		<div id="tags">
			<label>tags</label>
			<input v-model="article.tags"></input>
			<!-- Remove this later. Grab user information from session. -->
			<label>firstname</label>
			<input v-model="user.first_name" value="Justin"></input>
			<label>lastname</label>
			<input v-model="user.last_name" value="Chen"></input>
			<button v-on:click.prevent="submit">Submit</button>
		</div>
		<button v-on:click.prevent="submit">Submit</button>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ArticleService from '../services/ArticleService.js'

export default {
	name: 'add-article',
	components: {
		PageNav,
	},

	data () {
		return {
			user: {
				first_name: "",
				last_name: ""
			},
			article: {
				citations: "",
				content: "",
				tags: "",
				title: ""
			}
		}
	},

	methods: {
		submit() {
			ArticleService.createArticle({user: this.user, article: this.article}).then(function(data){
				return data.json();
			}).then(function(data) {
				alert(data);
			});
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
