<template>
	<div id="container" v-on:keyup="save()">
		<div id="editbar">
			<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
			<button class="toolbar" type="file" name="image" multiple v-on:click.prevent="add_image()">Image</button>
		</div>
		<div id="content-container" v-for="(value, index) in content">
			<p v-bind:id="'content-'+index" class="content" v-model="content[index].value" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.enter="add_content(index)" v-on:keyup.delete="remove_content(index)" contenteditable></p>
		</div>
	</div>
</template>

<script>
import ContentService from '../services/ContentService.js'

export default { 
	created() {
		var dropZone = document.getElementById('contain-container');
		dropZone.addEventListener('dragover', handleDrag, false);
		dropZone.addEventListener('drop', handleDrop, false);
	},
	data() {
		return {
			content: [{
				id: '',
				created: new Date(),
				last_modified: new Date(),
				text: '',
				html: '',
				form: new FormData()
			}],
			form: {
				data: new FormData()
			}
		}
	},
	methods: {
		add_content(index) {
			var next = index + 1;
			this.content.splice(next, 0, {
				text: '',
				html: ''
			});
			this.focus(next);
		},
		add_image() {
			// ContentService.getImage().then(function(data) {
			// 	console.log(data);
			// 	var html = '<img src="data:image/png;base64,'+data.data+'">'
			// 	document.execCommand('insertHTML', false, html);

			// });
			// https://jsfiddle.net/Xeoncross/4tUDk/
			var html = '<b>herro</b>';
			var sel, range;
			if (window.getSelection) {
				// IE9 and non-IE
				sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					range = sel.getRangeAt(0);
					range.deleteContents();

					// Range.createContextualFragment() would be useful here but is
					// non-standard and not supported in all browsers (IE9, for one)
					var el = document.createElement("div");
					el.innerHTML = html;
					var frag = document.createDocumentFragment(), node, lastNode;

					while ((node = el.firstChild)) {
						lastNode = frag.appendChild(node);
					}

					range.insertNode(frag);

					// Preserve the selection
					if (lastNode) {
						range = range.cloneRange();
						range.setStartAfter(lastNode);
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
					}
				}
			} else if (document.selection && document.selection.type != "Control") {
				// IE < 9
				document.selection.createRange().pasteHTML(html);
			}
		},
		emit_content() {
			this.$emit('content', this.content);
		},
		focus(index) {
			this.$nextTick(() => {
				this.$refs['content-'+index][0].focus()
			});
		},
		prevent_nl(event) {
			event.preventDefault();
		},
		remove_content(index) {
			var el = event.target;

			if(this.content.length > 1 && this.trim(el.innerText).length == 0) {
				this.content.splice(index, 1);
				var prev = index - 1;

				if(this.content.length > 0 && prev < 0) {
					this.focus(index);
				}
				else {
					this.focus(prev);
				}

				for(var i = 0; i < this.content.length; i++) {
					this.$refs['content-'+i][0].innerHTML = this.content[i].html;
				}
			}
		},
		save() {			
			var el = event.target;
			var id = el.getAttribute('id');
			var index = id[id.length-1];

			if(this.content[index] != null) {
				this.content[index].id = id;
				this.content[index].created = new Date();
				this.content[index].last_modified = new Date();
				this.content[index].text = this.trim(el.innerText);
				this.content[index].html = el.innerHTML;

				this.emit_content();
			}
		},
		stylize(style) {
			console.log(window.getSelection().getRangeAt(0));

			if(style == 'createLink') {

			}
			else if(style == 'insertImage') {
				
			}

			document.execCommand(style, false, null);

			for(var i = 0; i < this.content.length; i++) {
				this.content[i].html = this.$refs['content-'+i][0].innerHTML;
			}

			this.emit_content();
		},
		trim(str) {
			return str.replace(/\n|\r/g, "");
		}
	}
}
</script>

<style>
.content {
	width: 100%;
	-o-transition:.5s;
	-ms-transition:.5s;
	-moz-transition:.5s;
	-webkit-transition:.5s;
	transition:.5s;
	min-height: 5em;
	overflow:hidden;
	margin: 5 0px;
}

.content:hover {
  box-shadow: 0 0 1px #E8E8E8;
}
</style>