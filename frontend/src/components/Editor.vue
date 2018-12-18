<template>
	<div id="editor_container">
		<link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
		<div id="toolbar">
			<button class="ql-bold">Bold</button>
			<button class="ql-italic">Italic</button>
		</div>
		<div id="editor">
			hello
		</div>
	</div>
</template>

<script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>
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
		this.editor = new Quill('#editor', {
			modules: {
				toolbar: '#toolbar'
			},
			theme: 'snow',
			// format: ['bold', 'underline', 'header', 'italic']
		});
		// this.editor.root.innerHTML = this.value;
		// this.editor.on('text-change', () => this.update());
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