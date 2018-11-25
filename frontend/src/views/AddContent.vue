<template>
	<div class="add-article">
		<PageNav></PageNav>
		<h2>Add a new paper</h2>
		<form>
			<label>Title</label>
			<input type="text" v-model="content.title" required/>
			<label>Content</label>
			<textarea v-model="content.content"></textarea>
			<label>Year</label>
			<input type="text" v-model="content.year" required/>
			<label>Authors</label>
			<input type="text" v-model="content.authors" required/>
		</form>
		<div id="preview">
			<h3>Preview</h3>
			<p>Title {{ content.title }}</p>
			<p placeholder="Content..." >Content {{ content.content }}</p>
		</div>
		<div id="citations">
			<h3>Citations</h3>
			<textarea v-model="content.citations"></textarea>
		</div>
		<div id="tags">
			<label>tags</label>
			<input v-model="content.tags"></input>
			<!-- Remove this later. Grab user information from session. -->
			<label>firstname</label>
			<input v-model="user.first_name" value="Justin"></input>
			<label>lastname</label>
			<input v-model="user.last_name" value="Chen"></input>
		</div>
		<button v-on:click.prevent="submit">Submit</button>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ContentService from '../services/ContentService.js'

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
			content: {
				authors: [],
				citations: "",
				content: "",
				tags: "",
				title: "",
				year: 0
			}
		}
	},

	methods: {
		submit() {
			ContentService.createContent({user: this.user, content: this.content})
			.then(function(data) {
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
