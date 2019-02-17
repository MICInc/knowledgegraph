<template>
	<!-- <div id="container" v-on:keydown.delete="remove_active($event)" v-on:keydown.enter="add_content($event)" v-on:keydown.tab="focus($event)"> -->
	<div id="container" v-on:keydown.enter="add_content($event)" v-on:keydown.tab="focus($event)">
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index" v-bind:key="JSON.stringify(value)">
			<Cell :ref="'content-'+index" :content="content" :index="index" v-on:active_index="set_index($event)" v-on:save="save($event)" v-on:add="add_content()" v-on:hashtag="hashtag($event)" v-on:tag="switch_tag($event)" v-on:remove_cell="remove_cell($event)" v-on:focus="focus($event)"></Cell>
		</div>
	</div>
</template>

<script>
import Cell from '@/components/Cell'

export default {
	components: {
		Cell
	},
	data() {
		return {
			active_index: -1,
			cells: [{ id: Math.random(), tag: 'p' }],
			content: [{ id: Math.random()}],
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
			if(e != null && e.keyCode === 13 && e.shiftKey) return;

			e.preventDefault();
			if (this.active_index < 0) this.active_index == 0;

			this.active_index += 1;
			var cell_id = Math.random();
			this.content.splice(this.active_index, 0, { id: cell_id });
			this.cells.splice(this.active_index, 0, { id: cell_id, tag: 'p' });
			this.focus(this.active_index);
		},
		focus(e=null) {
			var key = '';
			if(e != undefined && e.which == 9) this.active_index += 1;

			if(this.active_index < this.content.length && this.cells[this.active_index].tag == 'p') {
				this.$nextTick(() => {
					var content = this.$refs['content-'+this.active_index][0];
					var p_tag = content.$refs['p-content'];

					p_tag.focus();
					content.set_end_contenteditable(p_tag);
				});
			}
		},
		hashtag(data) {
			this.emit_save.hashtag = data;
			this.save();
		},
		remove_cell(event) {
			console.log('remove_cell()');
			// if(this.active_index > -1) {
			// 	var el = this.cells[this.active_index];

			// 	if(el.tag == 'img' || el.tag == 'canvas' || el.tag == 'hr') {
			// 		// remove focus from all elements else will also accidentally delete other content
			// 		document.activeElement.blur();

			// 		this.content.splice(this.active_index, 1);
			// 		this.$emit('remove', this.active_index);
			// 		this.active_index -= 1;
			// 	}

			// 	this.save();

			// 	if(this.content.length == 0) {
			// 		this.add_content(e);
			// 		this.focus();
			// 	}
			// }
		},
		save(cell) {
			if(cell != undefined) {
				// this.content[cell.id].tag = cell.tag;
				this.emit_save.cell = cell;
				this.emit_save.update_cell = this.active_index;

				this.$emit('edit', this.emit_save);
				this.emit_save.button = false;
			}
		},
		set_index(new_index) {
			this.active_index = new_index;
		},
		switch_tag(cell) {
			this.cells[cell.index].tag = cell.tag;
		},
		stylize(style) {
			document.execCommand(style, false, null);

			this.emit_save.button = true;
			this.save();
		}
	}
}
</script>

<style>
</style>