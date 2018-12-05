<template>
	<div id="editor">
		hello
	</div>
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
		this.editor = new Quill('#editor', {
			modules: {
				toolbar: [
					[{header: [1,2,3,4,false] }],
					['bold', 'italic', 'underline']
				]
			},
			theme: 'snow',
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