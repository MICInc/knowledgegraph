<template>
	<div class="editor"></div>
</template>

<script>
import Quill from 'quill';

export default {
	name: 'Editor',
	props: {
		value: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			editor: null
		};
	},

	mounted() {
		this.editor = new Quill(this.$ref.editor, {
			modules: {
				toolbar: [
					[{header: [1,2,3,4,false] }],
					['bold', 'italic', 'underline']
				]
			},
			theme: 'bubble',
			format: ['bold', 'underline', 'header', 'italic']
		});
		this.editor.root.innerHTML = this.value;
		this.editor.on('text-change', () => this.update());
	},

	methods: {
		update() {
			this.$emit('input', this.editor.getText());
		}
	}
}
</script>

<style>
</style>