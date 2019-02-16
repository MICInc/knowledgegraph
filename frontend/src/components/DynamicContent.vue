<template>
	<div id="container" v-on:keydown.delete="remove_active($event)" v-on:keydown.enter="add_content($event)" v-on:keydown.tab="focus()">
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index" v-bind:key="JSON.stringify(value)">
			<Cell v-bind:ref="'content-'+index" :cell_id="content[index].id" :content="content" :html="content[index].html" :index="index" :name="content[index].name" :src="content[index].src" :tag="content[index].tag" v-on:save="save($event)" v-on:active_index="set_index($event)"></Cell>
		</div>
	</div>
</template>

<script>
import { bus } from '@/main'
import Cell from '@/components/Cell'

export default {
	components: {
		Cell
	},
	created() {
		bus.$on('active_index', (index) => {
			this.active_index = index;
		});

		bus.$on('focus', (index) => {
			this.focus(index);
		});
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
		add_content(e=null) {
			// ignore shift enter and allow other functions to call this
			if(e != null && e.keyCode === 13 && e.shiftKey) {
				return;
			}

			e.preventDefault();
			if (this.active_index < 0) this.active_index == 0;

			// var next = this.active_index + 1;
			this.active_index += 1;

			this.content.splice(this.active_index, 0, {
				id: Math.random(),
				tag: 'p',
				src: '',
				name: ''
			});

			this.focus(this.active_index);
		},
		focus(index=this.active_index) {
			if(index < this.content.length && this.content[index].tag == 'p') {
				this.$nextTick(() => {
					var content = this.$refs['content-'+index][0]
					var p_tag = content.$refs['p-content'];
					p_tag.focus();
					content.set_end_contenteditable(p_tag);
				});
			}
		},
		remove_active(e) {
			if(this.active_index > -1) {
				var el = this.content[this.active_index];

				if(el.tag == 'img' || el.tag == 'canvas' || el.tag == 'hr') {
					// remove focus from all elements else will also accidentally delete other content
					document.activeElement.blur();

					this.content.splice(this.active_index, 1);
					this.$emit('remove', this.active_index);
					this.active_index -= 1;
				}

				this.save();

				if(this.content.length == 0) {
					this.add_content(e);
					this.focus(this.active_index-1);
				}
			}
		},
		save() {
			var refs = this.$refs['content-'+this.active_index];

			if(refs != undefined) {
				var i = this.active_index;
				var el = refs[0].$refs['p-content'];
				
				var cell = {
					id: i,
					tag: this.content[i].tag == 'hr' ? 'hr' : this.content[i].tag,
					date_created: new Date(),
					last_modified: new Date(),
					text: this.content[i].tag == 'hr' ? '' : this.trim(el.innerText),
					html: this.content[i].tag == 'hr' ? '<hr>' : el.innerHTML,
					name: this.content[i].name != '' ? this.content[i].name : '',
					src: this.content[i].src != '' ? this.content[i].src : ''
				};

				this.emit_save.cell = cell;
				this.emit_save.update_cell = i;

				this.$emit('edit', this.emit_save);
				this.emit_save.button = false;
				this.emit_save.hashtag = '';
			}
		},
		set_index(new_index) {
			this.active_index = new_index;
		},
		stylize(style) {
			document.execCommand(style, false, null);

			this.emit_save.button = true;
			this.save();
		},
		trim(str, all=false) {
			return all ? str.replace(/\s/g, "") : str.replace(/\n|\r|&nbsp;/g, "");
		}
	}
}
</script>

<style>
</style>