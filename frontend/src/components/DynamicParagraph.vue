<template>
	<div id="container" v-on:keyup="save()" v-on:keydown.delete="remove_active()" v-on:keyup.enter="add_content()" v-on:keydown.tab="print_tag()">
		<div id="editbar">
			<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index" v-bind:key="value">
			<div class='tag_type'>
				<input v-bind:ref="'img-button-'+index" class="tag_switch" type="file" name="image" v-on:change="add_image(index, $event)">
				<button class="tag_switch" v-on:click.prevent="switch_content('hr', index)">hr</button>
				<button class="tag_switch" v-on:click.prevent="switch_content('p', index)">p</button>
			</div>
			<img class="image-content" v-bind:src="content[index].src" v-bind:id="'content-'+index" v-if="'img' == content[index].tag" v-bind:ref="'content-'+index" v-on:click="set_active(index)">
			<div class="content-hr" v-if="'hr' == content[index].tag" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)" v-on:keyup.enter="add_content(index)">
				<hr>
			</div>
			<p v-if="'p' == content[index].tag" v-bind:id="'content-'+index" class="content" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.delete="remove_content(index)" v-on:click="set_active(index)" contenteditable></p>
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
		test() {
			this.print_tag();
		},
		add_content() {
			var next = this.active_index + 1;
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
			var el = event.target;

			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					var filename = e.target.result;

					if(filename.length > 0) {
						this.content[index].id = index;
						this.content[index].tag = 'img';
						this.content[index].src = filename;
						this.content[index].html = '<img class=\"image-content\" src="'+filename+'"">';
						this.content[index].last_modified = new Date();
						this.$refs['content-'+index][0].innerHTML = this.content[index].html;
					}
				}
				reader.readAsDataURL(el.files[0]);
			}

			this.switch_content('img', index);
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
		print_tag() {
			console.log('==== content ('+this.content.length+'), ref ('+this.max_ref()+') ====');
			for(var i = 0; i < this.content.length+1; i++) {
				if(this.content[i] != null) {
				console.log('index: '+i+' content: '+this.content[i].tag+' html: '+this.content[i].html+' id: '+this.content[i].id+' ref: '+this.$refs['content-'+i][0].nodeName+' id: '+this.$refs['content-'+i][0].id+' html: '+this.$refs['content-'+i][0].innerHTML);
				}
				else if(this.$refs['content-'+i] != null) {
					if (this.$refs['content-'+i][0] != null) {
						console.log('index: '+i+' content: null id: null ref: '+this.$refs['content-'+i][0].nodeName+' id: '+this.$refs['content-'+i][0].id+' html: '+this.$refs['content-'+i][0].innerHTML);
					}
				}
			}
		},
		max_ref() {
			var len = this.content.length;
			if(this.$refs['content-'+(len+1)] != null) {
				return len+1;
			}
			return len;
		},
		remove_active() {
			// console.log('remove_active('+this.active_index+')');
			if(this.active_index > -1) {
				var el = this.content[this.active_index];
				if(el.tag == 'img') {
					el.tag = 'p';
					el.src = '';
					el.html = '';
				}
				this.$refs['img-button-'+this.active_index][0].value = '';
			}

			if(this.content.length == 0) {
				this.add_content();
			}

			this.active_index = -1;
		},
		remove_content(index) {
			// console.log('remove_content('+index+') = '+this.content[index].html);
			var el = event.target;

			// console.log('before removing');
			// this.print_tag();

			if(this.content.length > 1 && this.trim(el.innerText).length == 0) {
				this.content.splice(index, 1);

				var prev = index - 1;

				if(this.content.length > 0 && prev < 0) {
					this.focus(index);
				}
				else {
					this.focus(prev);
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
		set_active(index) {
			//highlight selection
			// console.log(index);
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