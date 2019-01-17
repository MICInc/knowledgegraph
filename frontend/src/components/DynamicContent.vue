<template>
	<div id="container" v-on:keyup="save()" v-on:keydown.delete="remove_active()" v-on:keyup.enter="add_content()" v-on:keydown.tab="focus()" v-on:keyup.up="print_tag()">
		<!-- <input name="file" type="file" v-on:change="import_file($event)"> -->
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index" v-bind:key="JSON.stringify(value)">
			<div class='tag_type'>
				<input v-bind:ref="'img-button-'+index" class="tag_switch" type="file" name="image" v-on:change="add_image(index, $event)">
				<button class="tag_switch" v-on:click.prevent="switch_content('hr', index)">hr</button>
				<button class="tag_switch" v-on:click.prevent="switch_content('p', index)">p</button>
				<!-- <button class="tag_switch" v-on:click.prevent="switch_content('canvas', index)">canvas</button> -->
			</div>
			<img class="image-content" v-bind:src="content[index].src" v-bind:id="'content-'+index" v-if="'img' == content[index].tag" v-bind:ref="'content-'+index" v-on:click="set_active(index)">
			<div class="content-hr" v-if="'hr' == content[index].tag" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)" v-on:keyup.enter="add_content(index)">
				<hr>
			</div>
			<p v-if="'p' == content[index].tag" v-bind:id="'content-'+index" class="content" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.delete="remove_content(index)" v-on:click="set_active(index)" contenteditable></p>
			<canvas v-if="'canvas' == content[index].tag" class="content" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)"></canvas>
		</div>
	</div>
</template>

<script>

export default { 
	data() {
		return {
			active_index: -1,
			content: [{
				id: Math.random(),
				tag: 'p',
				src: ''
			}],
			emit_save: {
				button: false,
				content: []
			}
		}
	},
	methods: {
		add_content() {
			var next = this.active_index + 1;

			this.content.splice(next, 0, {
				id: Math.random(),
				tag: 'p',
				src: ''
			});

			this.focus(next);
		},
		add_image(index, event) {
			var el = event.target;

			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					var src = e.target.result;

					if(src.length > 0) {
						this.content[index].tag = 'img';
						this.content[index].src = src;
						this.$refs['content-'+index][0].innerHTML = '<img class=\"image-content\" src="'+src+'"">';
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
		hashtags() {

		},
		focus(index=this.active_index+1) {
			this.active_index = index;
			this.$nextTick(() => {
				this.$refs['content-'+index][0].focus()
				this.set_end_contenteditable(this.$refs['content-'+index][0]);
			});
		},
		import_file(event) {
			var el = event.target;
			
			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					var content = e.target.result.split('\n\n');

					for(var i = 0; i < content.length; i++) {
						this.add_content();
						this.content[i].html = content[i];
					}
				}
				reader.readAsText(el.files[0])
			}
		},
		prevent_nl(event) {
			event.preventDefault();
		},
		print_tag() {
			console.log('==== content ('+this.content.length+') ====');
			for(var i = 0; i < this.content.length+1; i++) {
				if(this.content[i] != null) {
				console.log('index: '+i+' content: '+this.content[i].tag+' id: '+this.content[i].id+' ref: '+this.$refs['content-'+i][0].nodeName+' id: '+this.$refs['content-'+i][0].id+' html: '+this.$refs['content-'+i][0].innerHTML);
				}
				else if(this.$refs['content-'+i] != null) {
					if (this.$refs['content-'+i][0] != null) {
						console.log('index: '+i+' content: null id: null ref: '+this.$refs['content-'+i][0].nodeName+' id: '+this.$refs['content-'+i][0].id+' html: '+this.$refs['content-'+i][0].innerHTML);
					}
				}
			}

			console.log('==== saving ====');
			for(var i = 0; i < this.saved_content.length; i++) {
				console.log(this.saved_content[i]);
			}
		},
		remove_active() {
			if(this.active_index > -1) {
				var el = this.content[this.active_index];

				if(el.tag == 'img' || el.tag == 'canvas' || el.tag == 'hr') {
					el.tag = 'p';
				}
			}

			if(this.content.length == 0) {
				this.add_content();
			}

			this.active_index = -1;
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
			}
		},
		save() {
			var temp = [];

			for(var i = 0; i < this.content.length; i++) {
				var el = this.$refs['content-'+i][0];

				temp.push({
					id: i,
					tag: el.nodeName,
					date_created: new Date(),
					last_modified: new Date(),
					text: this.trim(el.innerText),
					html: el.innerHTML
				});
			}

			this.emit_save.content = temp;

			this.$emit('edit', this.emit_save);
			this.emit_save.button = false;
		},
		set_active(index) {
			if(this.active_index > -1) {
				this.$refs['content-'+this.active_index][0].style.outline = '';
			}
			
			this.active_index = index;
			console.log('active_index: '+this.active_index);
		},
		set_end_contenteditable(element) {
			// https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
			var range, selection;

			if(document.createRange) {
				range = document.createRange();//Create a range (a range is a like the selection but invisible)
				range.selectNodeContents(element);//Select the entire contents of the element with the range
				range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
				selection = window.getSelection();//get the selection object (allows you to change selection)
				selection.removeAllRanges();//remove any selections already made
				selection.addRange(range);//make 
			}
			else if(document.selection) {
				range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
				range.moveToElementText(element);//Select the entire contents of the element with the range
				range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
				range.select();
			}

		},
		stylize(style) {
			document.execCommand(style, false, null);

			this.emit_save.button = true;
			this.save();
		},
		switch_content(tag, index) {
			this.remove_active();
			this.content[index].tag = tag;
		},
		trim(str) {
			return str.replace(/\n|\r/g, "");
		}
	}
}
</script>

<style>
*:focus {
    outline: none;
}

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