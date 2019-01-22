<template>
	<!-- <div id="container" v-on:keyup="save()" v-on:keydown.delete="remove_active()" v-on:keyup.enter="add_content()" v-on:keydown.tab="focus()"> -->
	<div id="container" v-on:keydown.delete="remove_active()" v-on:keyup.enter="add_content()" v-on:keydown.tab="focus()">
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
				<input v-bind:ref="'img-button-'+index" class="tag_switch" type="file" name="image" v-on:change="add_image(index, $event)" accept="image/*">
				<button class="tag_switch" v-on:click.prevent="switch_content('hr', index)">hr</button>
				<button class="tag_switch" v-on:click.prevent="switch_content('p', index)">p</button>
				<!-- <button class="tag_switch" v-on:click.prevent="switch_content('canvas', index)">canvas</button> -->
			</div>
			<img class="image-content" v-bind:src="content[index].src" v-bind:id="'content-'+index" v-if="'img' == content[index].tag" v-bind:ref="'content-'+index" v-on:click="set_active(index)">
			<div class="content-hr" v-if="'hr' == content[index].tag" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)" v-on:keyup.enter="add_content(index)">
				<hr>
			</div>
			<p v-if="'p' == content[index].tag" v-bind:id="'content-'+index" class="content" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup.delete="remove_content(index)" v-on:keyup="input(index, $event)" v-on:click="set_active(index)" contenteditable></p>
			<canvas v-if="'canvas' == content[index].tag" class="content" v-bind:id="'content-'+index" v-bind:ref="'content-'+index" v-on:click="set_active(index)"></canvas>
		</div>
	</div>
</template>

<script>

export default {
	created() {
		this.focus(0)
	},
	data() {
		return {
			active_index: -1,
			content: [{
				id: Math.random(),
				tag: 'p',
				src: '',
				name: ''
			}],
			emit_save: {
				button: false,
				cell: undefined,
				hashtag: '',
				update_cell: -1
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

			// disable previous cell content
			this.content[index].tag = 'img';

			if(el.files && el.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					// everything in this scope is async so accessing any of the variables
					// that are updated in here will not be updated after this scope e.g. this.content
					var src = e.target.result;

					if(src.length > 0) {
						this.content[index].src = src;
						this.content[index].name = el.files[0].name;
						this.save();
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
		focus(index=this.active_index+1) {
			if(index < this.content.length && this.content[index].tag == 'p') {
				this.active_index = index;
				this.$nextTick(() => {
					this.$refs['content-'+index][0].focus()
					this.set_end_contenteditable(this.$refs['content-'+index][0]);
				});
			}
		},
		getCaretPosition(element) {
			//https://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
			var caretPos = 0,
			sel, range;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					range = sel.getRangeAt(0);
					if (range.commonAncestorContainer.parentNode == element) {
						caretPos = range.endOffset;
					}
				}
			}
			else if (document.selection && document.selection.createRange) {
				range = document.selection.createRange();
				if (range.parentElement() == element) {
					var tempEl = document.createElement("span");
					element.insertBefore(tempEl, element.firstChild);
					var tempRange = range.duplicate();
					tempRange.moveToElementText(tempEl);
					tempRange.setEndPoint("EndToEnd", range);
					caretPos = tempRange.text.length;
				}
			}
			return caretPos > 0 ? caretPos-1 : 0;

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
		input(index, event) {
			
			// if spacebar was pressed, detect and insert hashtag
			if(event.which == 32) {
				var el = event.target;
				var sel = document.getSelection();
				var innerHTML = el.innerHTML;
				var length = innerHTML.length;

				// extend back and highlight one word and then
				// extend back one more to find if there's a hashtag
				sel.modify("extend", "backward", "word");
				sel.modify("extend", "backward", "character");
				var has_hash = sel.toString()[0] == '#';
				var sel_html = sel.anchorNode;
				var has_bold = sel_html.parentNode.nodeName == 'B';


				if(has_hash && !has_bold) {
					var target = this.trim(sel.toString(), true);
					var hashtag = '<b><a class=\"hashtag\" style=\"color:black;\" href=/search/'+target+'>'+target+'</a></b>&nbsp;';
					this.emit_save.hashtag = target;

					var range = sel.getRangeAt(0);
					range.deleteContents();
					this.replace_html(range, hashtag);
				}
				
				sel.removeAllRanges();
			}
			this.save();
		},
		prevent_nl(event) {
			event.preventDefault();
		},
		remove_active() {
			if(this.active_index > -1) {
				var el = this.content[this.active_index];

				if(el.tag == 'img' || el.tag == 'canvas' || el.tag == 'hr') {
					this.content.splice(this.active_index, 1);
				}

				this.save();
			}

			if(this.content.length == 0) {
				this.add_content();
			}
		},
		remove_content(index) {
			var el = event.target;

			if(this.content.length > 1 && this.trim(el.innerText).length == 0) {
				this.content.splice(index, 1);
				this.active_index -= 1;

				this.save();
				
				var prev = index - 1;

				if(this.content.length > 0 && prev < 0) {
					this.focus(index);
				}
				else {
					this.focus(prev);
				}
			}
		},
		replace_html(range, target) {
			var el = document.createElement("a");
			el.innerHTML = target;
			var frag = document.createDocumentFragment(), node;

			while(node = el.firstChild) {
				frag.appendChild(node);
			}

			range.insertNode(frag);
			range.collapse();
		},
		save() {
			var i = this.active_index;
			var el = this.$refs['content-'+i][0];
			var cell = {
				id: i,
				tag: el.nodeName.toLowerCase(),
				date_created: new Date(),
				last_modified: new Date(),
				text: this.trim(el.innerText),
				html: this.trim(el.innerHTML),
				name: this.content[i].name,
				src: this.content[i].src
			};

			this.emit_save.cell = cell;
			this.emit_save.update_cell = i;

			this.$emit('edit', this.emit_save);
			this.emit_save.button = false;
			this.emit_save.hashtag = '';
		},
		set_active(index) {
			if(this.active_index > -1) {
				if(this.$refs['content-'+this.active_index][0] != null) {
					this.$refs['content-'+this.active_index][0].style.outline = '';
				}
			}
			
			this.active_index = index;
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
			this.content[index].tag = tag;
			this.save();
		},
		trim(str, all=false) {
			return all ? str.replace(/\s/g, "") : str.replace(/\n|\r|&nbsp;/g, "");
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