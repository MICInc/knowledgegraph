<template>
	<div id="container" v-on:keydown.delete="remove($event)" v-on:keydown.enter="add_content($event)">
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<Cell v-for="(value, index) in content" 
			  :id="'content-container-'+index" 
			  :tabindex="active_index" 
			  :key="JSON.stringify(value.id)" 
			  :ref="'content-'+index" 
			  :content="content" 
			  :index="index"
			   v-on:active_index="set_index($event)" 
			   v-on:save="save($event)" 
			   v-on:tag="switch_tag($event)" 
			   v-on:remove="remove_cell($event)" 
			   v-on:focus="focus()">
		</Cell>
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
			cells: [{ id: this.init_id, tag: 'p' }],
			content: [{ id: this.init_id}],
			init_id: Math.random(),
			emit_save: {
				button: false,
				cell: undefined,
				update_cell: -1
			}
		}
	},
	methods: {
		add_content(event=null) {
			if(event != undefined) event.preventDefault();

			this.active_index += 1;
			var cell_id = Math.random();
			this.content.splice(this.active_index, 0, { id: cell_id });
			this.cells.splice(this.active_index, 0, { id: cell_id, tag: 'p' });
			this.focus();
		},
		focus(event=null) {
			if(event != undefined && event.which == 9) this.active_index += 1;

			if(this.active_index >= 0 && this.active_index < this.content.length) {
				this.$nextTick(() => {
					var content = this.$refs['content-'+this.active_index][0];
					if(this.cells[this.active_index].tag == 'p') content.set_end_contenteditable(content.$refs['p-content']);
				});
			}
		},
		remove(event) {
			// call remove_cell() in child component
			var cell = this.$refs['content-'+this.active_index];
			if(cell != null) cell[0].remove_cell();
		},
		remove_cell(index) {
			console.log('DC.remove_cell');
			if(index >= 0) {
				if(this.cells[index].tag == 'p' && this.active_index == 0) return;

				this.cells.splice(index, 1);
				this.content.splice(index, 1);

				var prev = index - 1;
				if(prev >= 0) this.active_index = prev;

				if(this.content.length == 0) {
					this.add_content();
				}
				else {
					this.focus();
				}
				this.$emit('remove', index);
			}
		},
		save(cell) {
			if(cell != undefined) {
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