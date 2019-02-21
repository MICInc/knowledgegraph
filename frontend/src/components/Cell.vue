<template>
	<div id="container" v-on:keydown.delete.stop="remove_cell()" >
		<div class="tag-type" v-show="is_empty">
			<input ref="img-button" class="tag_switch" type="file" name="image" v-on:change="add_image($event)" accept="image/*">
			<button class="tag_switch" v-on:click.prevent="switch_tag('hr', $event)">hr</button>
			<button class="tag_switch" v-on:click.prevent="switch_tag('p', $event)">p</button>
		</div>
		<figure v-if="'img' == cell.tag" v-on:click="set_active($event)">
			<img class="image-content" :src="cell.src" v-on:keydown.enter.stop="show_caption($event)">
			<figcaption class="caption" 
						v-show="has_caption" 
						v-on:keyup="caption($event)" 
						v-on:keydown.delete.stop="remove_caption($event)" 
						contenteditable>
				<span v-show="has_caption_default" v-on:click="hide_on_click($event)">Add a caption</span>
			</figcaption>
		</figure>
		<div class="content-hr" v-if="'hr' == cell.tag" ref="hr-content" v-on:click="set_active($event)">
			<hr>
		</div>
		<p v-if="'p' == cell.tag" 
		   class="content" 
		   ref="p-content" 
		   v-on:keydown.delete="check_content($event)"
		   v-on:keyup="input($event)" 
		   @mousedown="set_active($event)" 
		   contenteditable>
		</p>
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
				caption: '',
				hashtags: [],
				html: '',
				name: '',
				src: '',
				tag: 'p',
				text: '',
			},
			has_caption: true,
			has_caption_default: true,
			is_empty: true
		}
	},
	methods: {
		add_image(event) {
			var el = event.target;
			this.cell.tag = 'img';
			this.$emit('tag', {index: this.index, tag: 'img', 'focus': false});
			this.$emit('active_index', this.index);

			if(el.files && el.files[0]) {
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
		caption(event) {
			var el = event.target;
			this.cell.caption = el.innerText;
		},
		check_content(event) {
			var sel = document.getSelection();
			var sel_string = sel.toString();
			var sel_length = sel_string.length;

			// user highlighted text and the last char is a hashmark
			if(sel_string[sel_length-1] == '#') {
				sel.deleteFromDocument();
				this.remove_tag(event);
			}
			else if(sel_length == 0) {
				//selected nothing, so backspacing one character and check if hashmark
				var pos = this.cursor_position();

				// if the cursor position is not at the very beginning
				// and the character you're about to delete is a hashmark
				if(pos > 0 && event.target.innerText[pos-1] == '#') {
					this.remove_tag(event, true);
				}
			}
			// else selected substring without hashmark at the end so just delete normally
		},
		cursor_position(collapse=true) {
			var sel = document.getSelection();
			sel.modify("extend", "backward", "paragraphboundary");
			var pos = sel.toString().length;
			if(collapse && sel.anchorNode != undefined) sel.collapseToEnd();

			return pos;
		},
		hashtag(event) {
			var el = event.target;
			var cursor_node = el.firstChild;

			// if spacebar was pressed, detect and insert hashtag
			if(event.which == 32) {
				var sel = document.getSelection();
				var innerHTML = el.innerHTML;
				var length = innerHTML.length;
				var init_node = sel.anchorNode;

				// extend back and highlight one word and then
				// extend back one more to find if there's a hashtag
				sel.modify("extend", "backward", "word");
				sel.modify("extend", "backward", "character");
				var has_hash = sel.toString()[0] == '#';
				var sel_html = sel.anchorNode;
				var range = undefined;
				var has_bold = false;

				if(sel_html != undefined && has_hash) {
					var target = this.trim(sel.toString(), true);
					var hashtag = '<a class=\"hashtag\" style=\"color:black;\" href=/search/'+target+'>'+target+'</a>'+'\u00A0';
					this.cell.hashtags.push(target);

					var range = sel.getRangeAt(0);
					range.deleteContents();

					this.replace_html(range, hashtag);
				}

				if(sel.anchorNode != undefined) sel.collapseToEnd();
			}
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

					for(var i = 0; i < content.length; i++) {
						// this.add_content(e);
						this.html = content[i];
					}
				}
				reader.readAsText(el.files[0])
			}
		},
		input(event) {
			var el = event.target;

			if(el.innerText.length == 0) { 
				this.is_empty = true;
			}
			else {
				this.is_empty = false;
			}

			this.hashtag(event);
			
			this.cell.html = el.innerHTML;
			this.cell.text = el.innerText;
			this.cell.last_modified = new Date();

			this.save();
		},
		remove_caption(event) {
			var el = event.target;
			if(el.innerText.length == 0) this.has_caption = false;
		},
		remove_cell() {
			if(this.index > -1) {
				var remove_p = this.cell.tag == 'p' && this.trim(this.cell.text).length == 0;
				var remove_img = this.cell.tag == 'img' && this.trim(this.cell.caption).length == 0;
				var remove_hr = this.cell.tag == 'hr';

				if(remove_p || remove_img || remove_hr) {
					// remove focus from all elements else will also accidentally delete other content
					document.activeElement.blur();

					this.$emit('remove', this.index);
				}
			}
		},
		remove_tag(event) {
			var target = '';
			var el = event.target;
			var innerText = el.innerText;

			for(var i = this.cursor_position(); i < innerText.length; i++) {
				if(/\s$/.test(innerText[i])) break;
				target += innerText[i];
			}

			// hashtags can never contain spaces, so trim to remove anomalous whitespaces
			target = this.trim(target, true);

			for(var i = 0; i < el.children.length; i++) {
				var child = el.children.item(i);

				if(child.nodeName == 'B') {
					var word = this.trim(child.innerText.replace('#', ''), true);

					if(word == target) {
						event.preventDefault();
						var new_child = document.createTextNode(word);
						el.replaceChild(new_child, child);

						break;
					}
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
				// this.$emit('focus');
				if(el.style.border == '') el.style.border = "thin solid #460360";
				else el.style.border = '';
				
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
		shift_enter(event) {
			console.log('shift');
		},
		show_caption(event) {
			console.log(event)
		},
		switch_tag(tag, event) {
			this.$emit('active_index', this.index);
			this.$emit('tag', {index: this.index, tag: tag});

			this.cell.html = '';
			this.cell.name = '';
			this.cell.src = '';
			this.cell.tag = tag;
			this.cell.text = '';
			this.cell.last_modified = new Date();
			this.save();
			this.is_empty = true;
		},
		trim(str, all=false) {
			return all ? str.replace(/\s/g, "") : str.replace(/\n|\r|&nbsp;/g, "");
		}
	},
	props: ['index', 'content']
}
</script>

<style>
*:focus {
    outline: none;
}

.caption {
	text-align: center;
	font-size: 0.8em;
	color: #606060;
}

.content {
	width: 100%;
	-o-transition:.5s;
	-ms-transition:.5s;
	-moz-transition:.5s;
	-webkit-transition:.5s;
	transition:.5s;
	min-height: 1em;
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
	border: 1px solid transparent;
}
</style>