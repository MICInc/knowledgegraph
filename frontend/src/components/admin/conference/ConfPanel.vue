<template>
	<div id="container">
		Conference Panel
	</div>
</template>

<script>
export default {
	name: 'ConfPanel',
	data() {
		return {
			panels: [
				{
					name: 'overview',
					src: '#overview'
				},
				{
					name: 'applications',
					src: '#applications'
				}
			],
			props: {
				activate: {
					type: Boolean,
					required: true
				}
			}
		}
	},
	mounted() {
		this.emit_panel();
	},
	methods: {
		emit_panel() {
			console.log('emitting panels')
			this.$emit('program_panels', this.panels);
		}
	}
}
</script>

<style>
</style>