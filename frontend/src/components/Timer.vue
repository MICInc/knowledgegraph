<template>
	<div class="container"></div>
</template>

<script>
export default {
	beforerDestroyed() {
		this.$emit('time', {start: this.start, stop: new Date()});
	},
	data() {
		return {
			start: new Date()
		}
	}
	props: ['url'];
}
</script>