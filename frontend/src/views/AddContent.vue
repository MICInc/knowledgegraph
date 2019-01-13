<template>
	<div class="add-article main" v-on:keyup="save()" v-on:keydown="prevent_default($event)">
		<PageNav></PageNav>
		<div class="container">
			<button>Publish</button>
			<span>{{ save_status }}</span>
			<form>
				<DynamicContent v-on:edit="update_content($event)"></DynamicContent>
			</form>
			<div id="bibtex" class="meta-info">
				<h4>BibTeX citation</h4>
				<p>{{ bibtex.to_string }}</p>
			</div>
			<div id="tags">
				<input class="meta-info" v-model="tags" placeholder="Tags"></input>
			</div>
			<button>Publish</button>
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
		this.bibtex_to_string();
	},
	data() {
		return {
			test: '',
			content_id: '',
			bibtex: {
				name: "",
				properties: ["year"],
				values: {
					address: "",
					annotate: "",
					author: "",
					booktitle: "",
					chapter: "",
					crossref: "",
					doi: "",
					edition: "",
					editor: "",
					howpublished: "",
					institution: "",
					journal: "",
					key: "",
					month: "",
					note: "",
					number: "",
					organization: "",
					pages: "",
					publisher: "",
					school: "",
					series: "",
					title: "",
					type: "@article",
					volume: "",
					year: (new Date()).getFullYear()
				},
				to_string: "",
			},
			data: {
				date_created: new Date(),
				citations: '',
				content: [],
				last_modified: undefined,
				tags: ''
			},
			display: {
				papers: []
			},
			save_status: '',
			tags: [''],
			upload: [],
			user: {
				first_name: "Justin",
				last_name: "Chen"
			}
		}
	},
	methods: {
		add_bibtex(property) {
			var index = this.bibtex.properties.indexOf(property);

			if(index < 0) {
				this.bibtex.properties.push(property);
			}
			else if(this.bibtex.values[property].length == 0) {
				this.bibtex.properties.splice(index, 1);
			}

			this.bibtex_to_string();
		},
		adjust_textarea(tag) {
			tag.style.height = "1px";
			tag.style.height = (25+tag.scrollHeight)+"px";
		},
		bibtex_to_string() {
			var bib = this.bibtex.values.type+'{';
			var properties = this.bibtex.properties.sort();
			var values = this.bibtex.values;

			if(this.bibtex.name.length == 0 && values.author.length > 0 && values.title.length > 0) {
				var authors = values.author.split(' ');
				var auth = '';

				if(authors.length > 1) {
					auth = authors[1];
				}
				else {
					auth = authors[0];
				}

				this.bibtex.name = (auth + values.year + values.title.split(' ')[0]).toLowerCase();
			}

			bib += this.bibtex.name+', ';

			for(var i = 0; i < properties.length; i++) {
				var p = properties[i];

				bib += p + '= {' + this.bibtex.values[p] + '}';

				if(i+1 < properties.length) {
					bib += ', ';
				}
			}
			
			bib += '}';
			this.bibtex.to_string = bib;
		},
		parse_file(event) {
			var data = new FormData();

			for(var i = 0; i < event.target.files.length; i++) {
				var paper = event.target.files[i];
				data.append('file-'+i, paper);
				this.display.papers.push(paper.name);
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
			var article = { id: this.content_id, user: this.user, content: this.data, bibtex: this.bibtex }

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


</style>