<template>
	<div id="container" v-on:keyup="save()">
		<div id="editbar">
			<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertImage', $event)" type="file" name="image" multiple >Image</button>
		</div>
		<div v-for="(value, index) in content">
			<p v-bind:id="'content-'+index" class="content" v-model="content[index].value" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.enter="add_content(index)" v-on:keyup.delete="remove_content(index)" contenteditable></p>
		</div>
	</div>
</template>

<script>
export default { 
	data() {
		return {
			content: [{
				id: '',
				created: new Date(),
				last_modified: new Date(),
				text: '',
				html: ''
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
			if(style == 'createLink') {

			}
			else if(style == 'insertImage') {
				var image = event.target.files[0];
				this.form.data.append(image.name, image, image.name);
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