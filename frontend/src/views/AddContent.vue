<template>
	<div class="add-article">
		<PageNav></PageNav>
		<h2>Add a new paper</h2>
		<form>
			<label>Title</label><br>
			<input type="text" v-model="content.title" required/><br>
			<label>Content</label><br>
			<Editor></Editor>
			<div v-for="(value, index) in content.info">
				<textarea :ref="'content'+index" v-model="content.info[index]" v-on:keyup.enter="add_content(index)"></textarea><br>
			</div>
			<label>Year</label><br>
			<input type="text" v-model.number="content.year" required/><br>
			<label>Authors</label><br>
			<input type="text" v-model="content.authors" required/>
		</form><br>
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
			<label>tags</label><br>
			<input v-model="content.tags"></input><br>
			<!-- Remove this later. Grab user information from session. -->
			<label>firstname</label><br>
			<input v-model="user.first_name" value="Justin"></input><br>
			<label>lastname</label><br>
			<input v-model="user.last_name" value="Chen"></input><br>
		</div>
		<button v-on:click.prevent="submit">Submit</button>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ContentService from '../services/ContentService.js'
import Editor from '@/components/Editor.vue'

export default {
	name: 'add-article',
	components: {
		PageNav,
		Editor
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
				info: [""],
				tags: "",
				title: "",
				year: 0
			}
		}
	},

	methods: {
		add_content(index) {
			var next = index + 1;
			this.content.info.splice(next, 0, '');
		},
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

ul {
  list-style-type: none;
}

textarea {
   resize: none;
}

</style>
