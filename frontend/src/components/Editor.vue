<template>
	<div id="editor_container">
		<link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
		<div id="toolbar">
			<button class="ql-bold">Bold</button>
			<button class="ql-italic">Italic</button>
			<button class="ql-underline">Underline</button>
			<button class="ql-script" value="sub"></button>
			<button class="ql-script" value="super"></button>
		</div>
		<p id='editor'></p>
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
			editor: null,
			text: ''
		};
	},

	mounted() {
		this.editor = new Quill('#editor', {
			modules: {
				toolbar: '#toolbar'
			},
			theme: 'snow',
		});
	},

	methods: {
		update() {
			this.$emit('input', this.editor.getText());
		},
		processEditOperation: function (operation) {
			this.text = operation.api.origElements.innerHTML;
		}
	}
}
</script>

<style>
</style>