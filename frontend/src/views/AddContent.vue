<template>
	<div class="container" v-on:keydown="prevent_default($event)">
		<PageNav></PageNav>
		<div id="editor">
			<div id="publish">
				<button v-on:click.prevent="publish()">Publish</button>
				<span id="status" :class="{ error: save_error }" class="save-status">{{ save_status }}</span>
			</div>
			<input 
				type="text" 
				id="title" 
				placeholder="TITLE" 
				v-model.trim="data.title" 
				@input="uppercase($event, data, 'title')" 
				v-on:keyup="save()" 
				autofocus>
			<br>
			<div id="pre-sub-box">
				<Prereq v-on:update="update_prereq($event)"></Prereq>
				<Subseq v-on:update="update_subseq($event)"></Subseq>
			</div>
			<form>
				<DynamicContent
					v-on:edit="update_content($event)" 
					v-on:add="add_content($event)" 
					v-on:remove="remove_content($event)" 
					:reloaded="reloaded">
				</DynamicContent>
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import ContentService from '@/services/ContentService.js';
import DynamicContent from '@/components/editor/DynamicContent';
import AuthMixin from '@/mixins/AuthMixin';
import router from '@/router';
import Path from 'path';
import Prereq from '@/components/editor/Prereq';
import Subseq from '@/components/editor/Subseq'

window.onbeforeunload = function() {
    return "Are you sure you want to close the window?";
}

export default {
	name: 'add-article',
	components: {
		PageNav,
		DynamicContent,
		Prereq,
		Subseq
	},
	created() {
		this.authors.push({	
			first_name: this.$store.state.userInfo.first_name,
			last_name: this.$store.state.userInfo.last_name,
			url: this.$store.state.userInfo.url,
			id: this.$store.state.userInfo.id
		});

		if(this.$route.path.split('/').pop() == 'edit') this.reload();
		else this.save();
	},
	data() {
		return {
			data: {
				date_created: new Date(),
				cell: undefined,
				citations: '',
				last_modified: undefined,
				prereqs: '',
				subseqs: '',
				title: ''
			},
			reloaded: [],
			save_error: false,
			save_status: '',
			tags: [],
			upload: [],
			url: '',
			authors: [],
			token: this.$store.state.accessToken,
			user_id: this.$store.state.userInfo.id,
			email: this.$store.state.userInfo.email,
			content_id: '',
		}
	},
	methods: {
		add_content(index) {
			ContentService.addContent({ id: this.content_id, index: index, token: this.token, email: this.email })
			.then((data) => {
			})
			.catch(error => {
			});
		},
		prevent_default(event) {
			if((event.which == 115 && event.ctrlKey) || (event.which == 19)) {
				event.preventDefault();
				this.save();
			}
		},
		publish() {
			if(this.data.title.length == 0) alert('Need a title');
			else if(this.data.cell == undefined) alert('Your article is empty');
			else {
				this.save_status = 'publishing...';
				this.save(true);
				this.save_status = 'published';
			}
		},
		redirect() {
			this.$router.push('/content/'+this.url);
		},
		reload() {
			var article = {
				url: this.$route.params.id,
				user_id: this.user_id,
				token: this.token,
				email: this.email
			}
			
			ContentService.reload({ params: article })
			.then((data) => {
				this.content_id = data.data._id;
				this.reloaded = data.data.content;
				this.data.title = data.data.title;
			})
			.catch((error) => {
			});
		},
		remove_content(index) {
			var cell = { 
				id: this.content_id, 
				index: index, 
				token: this.token, 
				email: this.email
			};

			ContentService.removeContent(cell)
			.then((data) => {
			})
			.catch(error => {
			});
		},
		save(publish=false) {
			// check if article title exists before saving
			if(this.data.title.length == 0) return;

			ContentService.check_title({ id: this.content_id, title: this.data.title, email: this.email, token: this.token })
			.then((data) => {
				if(!data.data.ok) {
					this.save_error = true;
					this.save_status = data.data.desc;
					return;
				}
			
				// only save if title is unique
				this.save_error = false;
				this.save_status = 'saving...';
			
				this.data.last_modified = new Date();
				
				var article = { 
					id: this.content_id, 
					authors: this.authors, 
					data: this.data, 
					publish: publish, 
					user_id: this.user_id,
					token: this.token,
					email: this.email
				};
				
				ContentService.saveContent(article)
				.then((data) => {
					if(data.data.error != null) alert(data.data.error);
					if(data != undefined) {
						if(this.content_id.length == 0) this.content_id = data['data'].id;
						if(this.url != data['data'].url) this.url = data['data'].url;

						this.save_status = 'saved';
					}
				})
				.catch((error) => {
					var status = error.response.status;
					if(status == 401) {
						this.$store.dispatch('logout').then((response) => {
							router.push({ name: 'home' })
						}).catch((err) => {
							router.push({ name: 'home' })
						})
					}
				});
			})
			.catch(error => {
			});
		},
		update_content(emit_save) {
			this.data.cell = emit_save.cell;
			this.data.update_cell = emit_save.update_cell;	
			this.save();
		},
		update_prereq(prereqs) {
			this.data.prereqs = prereqs;
		},
		update_subseq(subseqs) {
			this.data.subseqs = subseqs;
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
			});
		},
		uppercase(e, o, prop) {
			const start = e.target.selectionStart;
			e.target.value = e.target.value.toUpperCase();
			this.$set(o, prop, e.target.value);
			e.target.setSelectionRange(start, start);
		},
		async a_publish() {
			return await ContentService.publish();
		}
	},
	mixins: [AuthMixin],
	props: ['content'],
	ready: function() {
		Vue.util.on(window, 'beforeunload', this.save, false);
	}
}
</script>

<style scoped>

button {
	border: none;
	color: #000;
}

.main {
	display: flex;
	flex-direction: column;
}

#editor {
	margin-top: 10px;
}

#publish {
	width: 100%;
	display: inline-block;
	flex-direction: column;
}

#publish button {
	height: 20px;
	font-size: 0.8em;
	border: solid 1px #dede;
	-o-transition:.5s;
	-ms-transition:.5s;
	-moz-transition:.5s;
	-webkit-transition:.5s;
	transition:.5s;
}

#publish button:hover {
	border: solid 1px #777;
}

#status {
	margin: 1em;
}

form {
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
	border: none;
	max-width: calc(600px - 10px);
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

#pre-sub-box {
	display: flex;
	margin: 0;
	padding: 0;
}

.error {
	color: red;
}

</style>