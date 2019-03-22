<template>
	<div class="container" v-on:keydown.delete.stop="remove_cell($event)" v-on:keydown.tab="focus_next($event)">
		<div class="tag-type" v-show="is_empty">
			<input ref="img-button" class="tag_switch" type="file" name="image" v-on:change="add_image($event)" accept="image/*">
			<button class="tag_switch" v-on:click.prevent="switch_tag('hr', $event)">hr</button>
			<button class="tag_switch" v-on:click.prevent="switch_tag('p', $event)">p</button>
		</div>
		<div class="editor-info">
			<figure v-if="'img' == cell.tag" v-on:click="set_active($event)">
				<img ref="image-content" class="image-content" :src="cell.src" v-on:keydown.enter.stop="show_caption($event)">
				<figcaption class="caption"
							ref="caption-content"
							v-show="has_caption" 
							v-on:keyup="set_caption($event)" 
							v-on:keydown.delete.stop="remove_caption($event)" 
							contenteditable>
					<span v-show="has_caption_default" v-on:click="hide_on_click($event)">Add a caption</span>
				</figcaption>
			</figure>
			<div class="content-hr" v-if="'hr' == cell.tag" ref="hr-content" v-on:click="set_active($event)">
				<hr>
			</div>
			<p id="p-content"
			   v-if="'p' == cell.tag" 
			   class="content" 
			   ref="p-content"
			   v-on:keyup="input($event)" 
			   @mousedown="set_active($event)" 
			   contenteditable>
			</p>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			cell: {
				id: Math.random(),
				index: this.index,
				date_created: new Date(),
				last_modified: new Date(),
				caption: this.caption,
				html: this.html,
				name: '',
				src: this.src,
				tag: this.tag,
				text: '',
			},
			file_limit: 2, //unit = mb
			has_caption: true,
			has_caption_default: true,
			image_active: false,
			is_empty: true
		}
	},
	methods: {
		activate_border() {
			var fig_ref = this.$refs['image-content'];
			if(fig_ref != undefined) {
				fig_ref.style.border = "thin solid #460360";
				this.image_active = true;
			}
		},
		add_image(event) {
			var el = event.target;
			this.cell.tag = 'img';
			this.$emit('tag', {index: this.index, tag: 'img', 'focus': false});
			this.$emit('active_index', this.index);
			this.$emit('focus');

			if(el.files && el.files[0] && this.valid_size(el.files[0].size)) {
				var reader = new FileReader();
				reader.onload = (e) => {
					// everything in this scope is async so accessing any of the variables
					// that are updated in here will not be updated after this scope e.g. this.content
					var src = e.target.result;
				
					if(src.length > 0) {
						this.cell.name = el.files[0].name;
						this.cell.src = src;
						this.cell.tag = 'img';
						this.cell.last_modified = new Date();
						this.save();

						this.is_empty = false;
					}
				}
				reader.readAsDataURL(el.files[0]);
			}
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
		set_caption(event) {
			var el = event.target;
			this.cell.caption = el.innerText;
		},
		cursor_position(collapse=true) {
			var sel = document.getSelection();
			sel.modify("extend", "backward", "paragraphboundary");
			var pos = sel.toString().length;
			if(collapse && sel.anchorNode != undefined) sel.collapseToEnd();

			return pos;
		},
		deactivate_border() {
			var fig_ref = this.$refs['image-content'];
			if(fig_ref != undefined) {
				fig_ref.style.border = '';
				this.image_active = false;
			}
		},
		focus_next(event) {
			event.preventDefault();
			this.$emit('active_index', this.index+1);
			this.$emit('focus');
		},
		hide_on_click(event) {
			if(this.cell.caption.length == 0) this.has_caption_default = false;
		},
		import_file(e) {
			var el = event.target;
			
			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					var content = e.target.result.split('\n\n');

					for(var i = 0; i < content.length; i++) this.html = content[i];
				}
				reader.readAsText(el.files[0])
			}
		},
		input(event) {
			var el = event.target;
			this.removeStyles(el);

			if(el.innerText.length == 0) { 
				this.is_empty = true;
			}
			else {
				this.is_empty = false;
			}
			
			this.cell.html = this.trim(el.innerHTML);
			this.cell.text = this.trim(el.innerText);
			this.cell.last_modified = new Date();

			this.save();
		},
		remove_caption(event) {
			var el = event.target;
			if(el.innerText.length == 0) this.has_caption = false;
		},
		remove_cell(event) {
			if(this.index > -1) {
				var null_p = this.cell.text != null;
				var remove_p = this.cell.tag == 'p' && !null_p && this.trim(this.cell.text).length == 0;
				var remove_img = this.cell.tag == 'img' && (this.cell.caption != null && this.trim(this.cell.caption).length == 0 || this.image_active);
				var remove_hr = this.cell.tag == 'hr';

				if(remove_p || remove_img || remove_hr) {
					// remove focus from all elements else will also accidentally delete other content
					// document.activeElement.blur();
					event.preventDefault();

					this.$emit('remove', this.index);
				}
			}
		},
		removeStyles(el) {
			// source: https://stackoverflow.com/questions/9252839/simplest-way-to-remove-all-the-styles-in-a-page
			el.removeAttribute('style');
			el.style.color = 'black';

			if(el.childNodes.length > 0) {
				for(var child in el.childNodes) {
					if(el.childNodes[child].nodeType == 1) this.removeStyles(el.childNodes[child]);
				}
			}
		},
		replace_html(range, target, node_type="a") {
			var el = document.createElement(node_type);
			el.innerHTML = target;
			var frag = document.createDocumentFragment(), node;

			while(node = el.firstChild) {
				frag.appendChild(node);
			}

			range.insertNode(frag);
		},
		save() {
			this.$emit('save', this.cell);
		},
		set_active(event) {
			var el = event.target;

			if(el.tagName == 'IMG') {
				if(el.style.border == '') this.activate_border();
				else this.deactivate_border();
				
				if(!this.has_caption) {
					this.has_caption = true;
					this.has_caption_default = true;
				}
			}

			this.$emit('active_index', this.index);
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
		switch_tag(tag, event) {
			this.$emit('active_index', this.index);
			this.$emit('tag', {index: this.index, tag: tag});
			this.$emit('focus');

			this.cell.html = '';
			this.cell.name = '';
			this.cell.src = '';
			this.cell.tag = tag;
			this.cell.text = '';
			this.cell.last_modified = new Date();
			this.save();
			this.is_empty = tag != 'hr';
		},
		trim(str, all=false) {
			if(typeof str !== 'string' && !(str instanceof String) && (typeof str == 'undefined')) return '';
			else all ? str.replace(/\s/g, "") : str.replace(/\n|\r/g, "");

		},
		valid_size(bytes) {
			var size_mb = bytes/(Math.pow(10, 6));
			var valid = size_mb <= this.file_limit; 
			if(!valid) alert('Image is '+size_mb.toFixed(2)+' MB > 2 MB.');
			return valid;
		}
	},
	props: ['index', 'html', 'tag', 'src', 'caption'], //add hr and captions
	watch: {
		index: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
			}
		},
		tag: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.cell.tag = curr;
			}
		},
		html: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.$nextTick(function() {
					var el = document.getElementById('p-content');
					if(el != null && curr != null && curr.length > 0) {
						el.innerHTML = curr;
						this.cell.html = curr;
					}
				});
			}
		},
		src: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.$nextTick(function() {
					var el = document.getElementById('image-content');
					if(el != null && curr != null) {
						el.src = curr;
						this.cell.src = curr;
					}
				});
			}
		},
		caption: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.$nextTick(function() {
					var el = document.getElementById('caption-content');
					if(el != null && curr != null) {
						el.innerText = curr;
						this.cell.caption = curr;
					}
				});
			}
		}
	}
}
</script>

<style scoped>
*:focus {
    outline: none;
}

.editor-info {
	width: 1080px;
}

.editor-info figure {
	margin: 0px;
}

.caption {
	text-align: center;
	font-size: 0.8em;
	color: #606060;
}

.content {
	width: 1080px;
	-o-transition:.5s;
	-ms-transition:.5s;
	-moz-transition:.5s;
	-webkit-transition:.5s;
	transition:.5s;
	min-height: 1em;
	overflow:hidden;
	margin: 5 0px;
	color: black;
	padding: 0px;
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
	max-width: 1080px;
	max-height: auto;
	vertical-align: middle; 
	border: 1px solid transparent;
}
</style>