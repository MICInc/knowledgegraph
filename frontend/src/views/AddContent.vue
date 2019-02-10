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
				<DynamicContent v-on:edit="update_content($event)" v-on:remove="remove_content($event)" :collab="data.content"></DynamicContent>
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import Socket from '@/services/sockets/EditorSocket'; 
import ContentService from '@/services/ContentService.js';
import DynamicContent from '@/components/DynamicContent';
import Path from 'path';

window.onbeforeunload = function() {
	Socket.close();
    return "Are you sure you want to close the window?";
}

export default {
	name: 'add-article',
	components: {
		PageNav,
		DynamicContent
	},
	created() {
		Socket.open((data) => {
			console.log(data);
		});

		Socket.receive((e) => {
			var data = typeof e.data == 'object' && e.data != null ? JSON.parse(e.data) : e.data;
			console.log('received: '+data);
		});
		
		var url = window.location.href.split('/');
		
		if(url[url.length-1] == 'edit') {
			this.data.title = url[url.length-2].toUpperCase();
			ContentService.getContent( { params: {url: url}})
			.then((data) => {
				this.data.content = data.data[0].content;
			});
		}
		else {
			this.save()
		}
	},
	data() {
		return {
			content_id: '',
			data: {
				date_created: new Date(),
				cell: undefined,
				citations: '',
				content: [],
				hashtags: [],
				last_modified: undefined,
				publish: false,
				title: ''
			},
			save_status: '',
			tags: [],
			upload: [],
			url: '',
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
			if(this.data.title.length == 0) {
				alert('Need a title');
			}
			else {
				this.data.publish = !this.data.publish;

				if(this.data.publish) {
					this.save_status = 'publishing...';
				}
				else {
					this.save_status = 'unpublishing...';
				}

				this.save();
				
				if(this.data.publish) {
					this.save_status = 'published';
				}
				else {
					this.save_status = 'unpublished';
				}

				// this.redirect();
			}
		},
		redirect() {
			this.$router.push('/content/'+this.url);
		},
		remove_content(index) {
			ContentService.removeContent({ id: this.content_id, index: index })
			.then((data) => {
			})
			.catch(error => {
				console.log(error);
			});
		},
		save() {
			this.save_status = 'saving...';

			this.data.last_modified = new Date();
			var article = { id: this.content_id, user: this.user, data: this.data };
			Socket.send(article);
			
			ContentService.saveContent(article)
			.then((data) => {

				if(data != undefined) {
					if(this.content_id.length == 0) {
						this.content_id = data['data'].id;
					}
					if(this.url != data['data'].url) {
						this.url = data['data'].url;
					}
				}
			})
			.catch(error => {
				console.log(error);
			});
			this.save_status = 'saved';
		},
		update_content(emit_save) {
			this.data.cell = emit_save.cell;
			this.data.update_cell = emit_save.update_cell;
			
			var hashtag = emit_save.hashtag;
			if(hashtag.length > 0 && !this.data.hashtags.includes(hashtag)) {
				this.data.hashtags.push(hashtag);
			}
			
			this.save();
		},
		upload_file(form_data) {
			form_data.append('content_id', this.content_id);

			var config = {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}

			ContentService.uploadFile('/content/parse', form_data, config)
			.then(function(data) {
				alert(data.json());
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		uppercase(e, o, prop) {
			const start = e.target.selectionStart;
			e.target.value = e.target.value.toUpperCase();
			this.$set(o, prop, e.target.value);
			e.target.setSelectionRange(start, start);
		}
	},
	props: ['content'],
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