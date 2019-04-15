<template>
	<div class="container" v-on:keydown.delete="remove($event)" v-on:keydown.enter="add_content($event)">
		<div id="editbar">
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
		</div>
		<!-- can remove id, tabindex, key, and ref...maybe idk -->
		<Cell v-for="(value, index) in cells"
			  :id="'content-container-'+index" 
			  :tabindex="index" 
			  :key="JSON.stringify(value.id)" 
			  :ref="'content-'+index"
			  :index="index"
			  :tag="value.tag"
			  :html="value.html"
			  :src="value.src"
			  :caption="value.caption"
			   v-on:active_index="set_index($event)" 
			   v-on:save="save($event)" 
			   v-on:tag="switch_tag($event)" 
			   v-on:remove="remove_cell($event)"
			   v-on:focus="focus()">
		</Cell>
	</div>
</template>

<script>
import Cell from '@/components/editor/Cell'
import Vue from 'vue'

export default {
	components: {
		Cell
	},
	data() {
		return {
			active_index: -1,
			cells: [{ id: this.init_id, html: '', tag: 'p', caption: '', src: '' }],
			init_id: Math.random(),
			emit_save: {
				button: false,
				cell: undefined,
				update_cell: -1,
			}
		}
	},
	methods: {
		add_content(e=null) {
			if(e != undefined) e.preventDefault();

			var comp = this.$refs['content-'+this.active_index];
			if(comp != undefined) comp[0].deactivate_border();

			this.active_index += 1;
			var cell_id = Math.random();
			this.cells.splice(this.active_index, 0, { id: cell_id, tag: 'p' });
			this.focus_eol();
			this.$emit('add', this.active_index);
		},
		focus() {
			var comp = this.$refs['content-'+this.active_index];
			if(comp != undefined) comp[0].$el.focus();

			var tag = this.cells[this.active_index].tag;
			if(tag == 'p') this.focus_eol();
			if(tag == 'img' && comp != undefined) comp[0].activate_border();
		},
		focus_eol(e=null) {
			if(e != undefined && e.which == 9) this.active_index += 1;

			if(this.active_index >= 0 && this.active_index < this.cells.length) {
				this.$nextTick(() => {
					var content = this.$refs['content-'+this.active_index][0];

					if(this.cells[this.active_index].tag == 'p') {
						var el = content.$refs['p-content-'+this.active_index]
						content.set_end_contenteditable(el);
					}
				});
			}
		},
		remove(event) {
			// call remove_cell() in child component
			var cell = this.$refs['content-'+this.active_index];
			if(cell != null) cell[0].remove_cell();
		},
		remove_cell(index) {
			if(index >= 0) {
				this.cells.splice(index, 1);

				var prev = index - 1;
				if(prev >= 0) this.active_index = prev;

				if(this.cells.length == 0) {
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
			this.active_index = (new_index < this.cells.length) ? new_index : this.active_index;
		},
		switch_tag(cell) {
			this.cells[cell.index].tag = cell.tag;
		},
		stylize(style) {
			document.execCommand(style, false, null);

			this.emit_save.button = true;
			this.save();
		}
	},
	props: ['reloaded'],
	watch: {
		reloaded: function(curr, prev) {
			this.cells = curr;
		}
	}
}
</script>

<style scoped>
</style>