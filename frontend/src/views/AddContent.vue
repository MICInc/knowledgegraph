<template>
	<div class="add-article main">
		<PageNav></PageNav>
		<div class="container">
			<h2>Add a new concept</h2>
			<form>
				<p>Upload content for parsing</p>
				<input type="file" name="paper-upload" multiple v-on:change="upload_file($event)"><br>
				<input type="text" v-model="content.title" placeholder="Title" required/>
				<!-- <Editor></Editor> -->
				<div v-for="(value, index) in content.info">
					<textarea :ref="'content'+index" v-model="content.info[index]" v-on:keyup.enter="add_content(index)" placeholder="Content"></textarea>
				</div>
				<input type="text" v-model="content.year" placeholder="Year" required/>
				<input type="text" v-model="content.authors" placeholder="Authors" required/>
			</form>
			<div id="citations">
				<h3>Additional Info</h3>
				<textarea v-model="content.citations" placeholder="Citations"></textarea>
			</div>
			<div id="tags">
				<input v-model="content.tags" placeholder="Tags"></input>
				<!-- Remove this later. Grab user information from session. -->
				<input v-model="user.first_name" placeholder="Your First Name"></input>
				<input v-model="user.last_name" placeholder="Your Last Name"></input>
			</div>
			<button v-on:click.prevent="submit">Submit</button>
		</div>
		<div class="preview">
			<h3>Preview</h3>
			<p>Title {{ content.title }}</p>
			<p placeholder="Content..." >Content {{ content.content }}</p>
		</div>
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
				year: undefined
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
		},
		upload_file(event) {
			var data = new FormData();
			var file = event.target.files[0];

			data.append('file', file);

			var config = {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}

			ContentService.uploadFile('/content/parse', data, config).then(function(data) {
				console.log(data);
			});
		}
	}
}
</script>

<style scoped>

.main {
	display: flex;
	flex-direction: column;
}

.container {
	width: 50%;
	/*flex: 1;*/
	float: left;
}

.preview {
	width: 50%;
	float: left;
}

form {
	width: 600px;
	display: flex;
	flex-direction: column;
}

textarea {
  width: calc(600px - 10px);
  min-height: 75px;
}

input {
	max-width: calc(600px - 10px);
}

ul {
  list-style-type: none;
}

#tags {
	display: flex;
	flex-direction: column;
}

</style>
