<template>
	<div class="add-article main" v-on:keyup="save()" v-on:keydown="prevent_default($event)">
		<PageNav></PageNav>
		<div class="container">
			<button>Publish</button>
			<span class="save-status">{{ save_status }}</span>
			<form>
				<DynamicContent v-on:edit="update_content($event)"></DynamicContent>
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
	data() {
		return {
			content_id: '',
			data: {
				date_created: new Date(),
				citations: '',
				content: [],
				last_modified: undefined,
				tags: ''
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
		parse_file(event) {
			var data = new FormData();

			for(var i = 0; i < event.target.files.length; i++) {
				var paper = event.target.files[i];
				data.append('file-'+i, paper);
			}

			var config = {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			}

			ContentService.uploadFile('/content/parse', data, config).then(function(data) {
				alert(data.json());
			});
		},
		prevent_default(event) {
			if((event.which == 115 && event.ctrlKey) || (event.which == 19)) {
				event.preventDefault();
				this.save();
			}
		},
		save() {
			this.save_status = 'saving...';
			this.data.last_modified = new Date();
			var article = { id: this.content_id, user: this.user, content: this.data }

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
	/*width: 50%;*/
	flex: 1;
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


</style>