<template>
	<div id="container" v-on:keydown.delete="remove($event)" v-on:keydown.enter="add_content($event)" v-on:keydown.tab="focus($event)">
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<div id="content-container" v-for="(value, index) in content" v-bind:tabindex="active_index" v-bind:key="JSON.stringify(value)">
			<Cell :ref="'content-'+index" :content="content" :index="index" v-on:active_index="set_index($event)" v-on:save="save($event)" v-on:tag="switch_tag($event)" v-on:remove="remove_cell($event)" v-on:focus="focus()"></Cell>
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
			if(e != undefined) e.preventDefault();

			this.active_index += 1;
			var cell_id = Math.random();
			this.content.splice(this.active_index, 0, { id: cell_id });
			this.cells.splice(this.active_index, 0, { id: cell_id, tag: 'p' });
			this.focus();
		},
		focus(e=null) {
			var key = '';
			if(e != undefined && e.which == 9) this.active_index += 1;
			console.log(this.active_index);
			console.log(this.cells[this.active_index]);

			if(this.active_index < this.content.length && this.cells[this.active_index].tag == 'p') {
				this.$nextTick(() => {
					var content = this.$refs['content-'+this.active_index][0];
					var p_tag = content.$refs['p-content'];

					// p_tag.focus();
					content.set_end_contenteditable(p_tag);
				});
			}
		},
		remove(event) {
			this.$refs['content-'+this.active_index][0].remove_cell();
		},
		remove_cell(cell) {
			if(cell.id >= 0) {
				this.content.splice(cell.id, 1);
				var prev = cell.id - 1;
				if(prev >= 0) this.active_index = prev;

				if(this.content.length == 0) {
					this.add_content();
				}
				else {
					this.focus();
				}
				console.log('removed: '+cell.id);
				this.save(cell);
			}
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