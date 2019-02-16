<template>
	<div id="container">
		<div class="tag-type" v-show="is_empty">
			<input ref="img-button" class="tag_switch" type="file" name="image" v-on:change="add_image($event)" accept="image/*">
			<button class="tag_switch" v-on:click.prevent="switch_content('hr', $event)">hr</button>
			<button class="tag_switch" v-on:click.prevent="switch_content('p', $event)">p</button>
		</div>
		<img class="image-content" v-bind:src="cell.src" id="content" v-if="'img' == cell.tag" ref="img-content" v-on:click="set_active('img-content')">
		<div class="content-hr" v-if="'hr' == cell.tag" id="content" ref="hr-content" v-on:click="set_active('hr-content')" v-on:keyup.enter="add_content($event)">
			<hr>
		</div>
		<p v-if="'p' == cell.tag" id="content" class="content" ref="p-content" v-on:keydown.delete="check_content($event)" v-on:keyup.delete="remove_content($event)" v-on:keyup="input($event)" v-on:click="set_active('p-content')" contenteditable></p>
	</div>
</template>

<script>
import { bus } from '@/main'

export default {
	created() {
	},
	data() {
		return {
			cell: {
				id: this.index,
				date_created: new Date(),
				last_modified: new Date(),
				hashtags: [],
				html: '',
				name: '',
				src: '',
				tag: 'p',
				text: '',
			},
			is_empty: true
		}
	},
	methods: {
		add_content() {
			this.$emit('add');
		},
		add_image(event) {
			var el = event.target;
			this.$emit('active_index', this.index);

			// disable previous cell content
			this.tag = 'img';

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
		import_file(e) {
			var el = event.target;
			
			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					var content = e.target.result.split('\n\n');

					for(var i = 0; i < content.length; i++) {
						this.add_content(e);
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

				if(sel_html != undefined) {
					has_bold = sel_html.parentNode.nodeName == 'B';

					if(has_hash && !has_bold) {
						var target = this.trim(sel.toString(), true);
						var hashtag = '<b><a class=\"hashtag\" style=\"color:black;\" href=/search/'+target+'>'+target+'</a></b>'+'\u00A0';
						this.$emit('hashtag', target);

						var range = sel.getRangeAt(0);
						range.deleteContents();

						this.replace_html(range, hashtag);
					}
				}

				if(sel.anchorNode != undefined) sel.collapseToEnd();
			}
		},
		prevent_nl(event) {
			event.preventDefault();
		},
		remove_content(event) {
			var el = event.target;

			// remove cell
			if(this.content.length > 1 && this.trim(el.innerText).length == 0) {
				this.content.splice(this.index, 1);
				this.$emit('active_index', this.index-1);

				var prev = this.index - 1;

				if(this.content.length > 0 && prev < 0) {
					// this.focus(this.index);
					bus.$emit('focus', this.index);
				}
				else {
					// this.focus(prev);
					bus.$emit('focus', this.index-1);
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
		set_active(ref) {
			if(this.index > -1) {
				if(this.$refs[ref][0] != null) {
					this.$refs[ref][0].style.outline = '';
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
		switch_content(tag, event) {
			this.$emit('active_index', this.index);
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
	props: ['index', 'content', 'index']
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