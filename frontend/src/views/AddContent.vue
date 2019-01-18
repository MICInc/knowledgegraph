<template>
	<div class="add-article main" v-on:keyup="save()" v-on:keydown="prevent_default($event)">
		<PageNav></PageNav>
		<div class="container">
			<button v-on:click.prevent="publish()">Publish</button>
			<span class="save-status">{{ save_status }}</span>
			<br>
			<input type="text" id="title" placeholder="UNTITLED" v-model.trim="data.title" @input="uppercase($event, data, 'title')">
			<br>
			<form>
				<DynamicContent v-on:edit="update_content($event)" v-on:file="upload_file($event)"></DynamicContent>
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import ContentService from '../services/ContentService.js';
import DynamicContent from '@/components/DynamicContent';

window.onbeforeunload = function(){
    return "Are you sure you want to close the window?";
}

export default {
	name: 'add-article',
	components: {
		PageNav,
		DynamicContent
	},
	created() {
		this.save()
	},
	data() {
		return {
			content_id: '',
			data: {
				date_created: new Date(),
				citations: '',
				content: [],
				last_modified: undefined,
				tags: '',
				title: '',
				publish: false
			},
			save_status: '',
			tags: [],
			upload: [],
			user: {
				first_name: "Justin",
				last_name: "Chen"
			}
		}
	},
	methods: {
		prevent_default(event) {
			if((event.which == 115 && event.ctrlKey) || (event.which == 19)) {
				event.preventDefault();
				this.save();
			}
		},
		publish() {
			this.data.publish = true;
			this.save_status = 'publishing...';
			this.save();
			this.save_status = 'published';
		},
		save() {
			this.save_status = 'saving...';

			this.data.last_modified = new Date();
			var article = { id: this.content_id, user: this.user, content: this.data, title: this.data.title }

			ContentService.saveContent(article)
			.then((data) => {

				if(data != null) {
					if(this.content_id.length == 0) {
						this.content_id = data['data'].id;
						console.log('content_id: '+this.content_id);
					}
				}
			});
			
			this.save_status = 'saved';
		},
		update_content(data) {
			this.data.content = data.content;

			if(data.button) {
				this.save();
			}
		},
		upload_file(form_data) {
			form_data.append('content_id', this.content_id);

			var config = {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}

			ContentService.uploadFile('/content/parse', form_data, config).then(function(data) {
				alert(data.json());
			});
		},
		uppercase(e, o, prop) {
			const start = e.target.selectionStart;
			e.target.value = e.target.value.toUpperCase();
			this.$set(o, prop, e.target.value);
			e.target.setSelectionRange(start, start);
		}
	},
	ready: function() {
		Vue.util.on(window, 'beforeunload', this.save, false);
	}
}
</script>

<style scoped>

.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
}

.preview {
	width: 50%;
}

form {
	width: 600px;
	display: flex;
	flex-direction: column;
}

.content {
  -o-transition:.5s;
  -ms-transition:.5s;
  -moz-transition:.5s;
  -webkit-transition:.5s;
  transition:.5s;
  min-height: 1em;
  overflow:hidden;
}

.content:hover {
  box-shadow: 0 0 1px #E8E8E8;
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

#title {
	font-size: 2em;
}

.upload * {
	font-size: 0.7em;
}

.meta-info {
	font-size: .85em;
}

.save-status {
	font-size: 0.8em;
}

#title {
	font-size: 2em;
	width: 100%;
	overflow: hidden;
	padding: 0;
	outline: none;
	height: 1em;
}


</style>