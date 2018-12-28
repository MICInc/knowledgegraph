<template>
	<div id="container" v-on:keyup="save()" v-on:keydown.delete="remove_active()">
		<div id="editbar">
			<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index">
			<div class='tag_type'>
				<input class="tag_switch" type="file" name="image" v-on:click="switch_content('img', index)" v-on:change="add_image(index, $event)">
				<button class="tag_switch" v-on:click.prevent="switch_content('hr', index)">hr</button>
				<button class="tag_switch" v-on:click.prevent="switch_content('p', index)">p</button>
			</div>
			<figure v-bind:id="'content-'+index" v-if="'img' == content[index].tag" v-bind:ref="'content-'+index" v-on:keyup.delete="remove_content(index)">
				<img class="image-content" v-bind:src="content[index].src" v-on:click="set_active(index)">
				<figcaption v-model="content[index].caption"></figcaption>
			</figure>
			<div class="content-hr" v-if="'hr' == content[index].tag" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)" v-on:keyup.enter="add_content(index)">
				<hr v-bind:id="'content-'+index">
			</div>
			<p v-if="'p' == content[index].tag" v-bind:id="'content-'+index" class="content" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.enter="add_content(index)" v-on:keyup.delete="remove_content(index)"  contenteditable></p>
		</div>
	</div>
</template>

<script>
import ContentService from '../services/ContentService.js'

export default { 
	data() {
		return {
			active_index: -1,
			content: [{
				id: '',
				caption: '',
				created: new Date(),
				last_modified: new Date(),
				tag: 'p',
				text: '',
				html: '',
				src: '',
				form: new FormData()
			}],
			form: {
				data: new FormData()
			}
		}
	},
	methods: {
		add_content(index=this.content.length-1) {
			var next = index + 1;
			this.content.splice(next, 0, {
				id: '',
				caption: '',
				created: new Date(),
				last_modified: new Date(),
				tag: 'p',
				text: '',
				html: '',
				src: '',
				form: new FormData()
			});
			this.focus(next);
		},
		add_image(index, event) {
			var file = event.target;

			if(file.files && file.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					this.$refs['content-'+index][0].src = e.target.result;
					this.content[index].id = index;
					this.content[index].tag = 'img';
					this.content[index].src = e.target.result;
					this.content[index].html = '<img class=\"image-content\" src="'+e.target.result+'"">';
					this.content[index].last_modified = new Date();
				}
				reader.readAsDataURL(file.files[0]);
			}
			console.log(this.content[index]);
		},
		arrayBufferToBase64(buffer) {
			var binary = '';
			var bytes = new Uint8Array( buffer );
			var len = bytes.byteLength;

			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode( bytes[ i ] );
			}

			return window.btoa( binary );
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
		remove_active() {
			console.log('removing active: '+this.active_index);
			
			if(this.active_index > -1) {
				this.content.splice(this.active_index, 1);
				this.update_refs();
			}

			this.active_index = -1;
		},
		remove_content(index) {
			console.log('removing content');

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

				this.update_refs();
			}
			console.log(this.content);
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
		set_active(index) {
			console.log(index);
			//highlight selection
			if(this.active_index > -1) {
				this.$refs['content-'+this.active_index][0].style.outline = '';
			}
			
			this.active_index = index;
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
		switch_content(tag, index) {
			var content = this.content[index];
			content.tag = tag;
			content.text = '';

			if(tag == 'p') {
				content.html = '<p></p>';
			}
			else if(tag == 'hr') {
				content.html = '<hr>';
			}

			if(this.content[this.content.length-1].tag != 'p') { 
				this.add_content();
			}
		},
		trim(str) {
			return str.replace(/\n|\r/g, "");
		},
		update_refs() {
			for(var i = 0; i < this.content.length; i++) {
				this.$refs['content-'+i][0].innerHTML = this.content[i].html;
				console.log(this.content[i].tag);
			}
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

.content-hr {
	min-height: 20px;
}

.image-content {
	display: block;
	margin: auto;
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle; 
}
</style>