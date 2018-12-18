<template>
	<div class="add-article main">
		<PageNav></PageNav>
		<div class="container">
			<button>Publish</button>
			<form>
				<input class="content" type="text" v-model="bibtex.values.author" v-on:blur="add_bibtex('author')" placeholder="Co-authors"/>
				<input id="title" class="content" type="text" v-model="bibtex.values.title" v-on:blur="add_bibtex('title')" placeholder="Title"/>
				<div v-for="(paper, index) in display.papers">
					{{ paper }}
				</div>
				<!-- <Editor></Editor> -->
				<div v-for="(value, index) in content">
					<textarea class='content' :ref="'content'+index" v-model="content[index].value" v-on:keyup="adjust_textarea(this)" v-on:keyup.enter="add_content(index)" placeholder="Content"></textarea>
				</div>
			</form>
			<div id="citations">
				<h3>Additional Info</h3>
				<div class="upload">
					Upload content for parsing:<br>
					<input type="file" name="paper-upload" multiple v-on:change="parse_file($event)"><br>
				</div>
				<textarea v-model="citations" placeholder="Citations"></textarea><br>
				<h4>BibTeX citation</h4>
				<p>{{ bibtex.to_string }}</p>
			</div>
			<div id="tags">
				<input v-model="content.tags" placeholder="Tags"></input>
			</div>
			<button>Publish</button>
		</div>
		<div class="preview">
			<h3>Preview</h3>
			<button>Publish</button>
			<p>Title {{ content.title }}</p>
			<p placeholder="Content..." >Content {{ content.content }}</p>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ContentService from '../services/ContentService.js'
import Editor from '@/components/Editor.vue'

window.onbeforeunload = function(){
    return "Are you sure you want to close the window?";
}

export default {
	name: 'add-article',
	components: {
		PageNav,
		Editor
	},
	created () {
		window.addEventListener('beforeunload', this.save);
		this.bibtex_to_string();
	},
	data () {
		return {
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
			citations: "",
			content: [{
				date: new Date(),
				last_modified: new Date(),
				tags: "",
				value: "",
			}],
			display: {
				papers: []
			},
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
		add_content(index) {
			var next = index + 1;
			this.content.splice(next, 0, '');
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
				console.log(p);
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
		save() {
			this.content.last_modified = new Date();

			ContentService.createContent({user: this.user, content: this.content, bibtex: this.bibtex})
			.then(function(data) {
				return data.json();
			}).then(function(data) {
				alert(data);
			});
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
	box-shadow: 0 0 1px #bcbcbc;
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

</style>
