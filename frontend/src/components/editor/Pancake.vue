<template>
	<div :class="{ expand: open }" v-on:click.prevent="change()">
		<div class="bar1"></div>
		<div class="bar2"></div>
		<div class="bar3"></div>
	</div>
</template>

<script>
export default {
	name: 'pancake',
	data() {
		return {
			open: false
		}
	},
	methods: {
		change() {
			this.open = !this.open;
			this.$emit('change', this.open);
		}
	}
}
</script>

<style scoped>
.bar1, .bar2, .bar3 {
	width: 14px;
	height: 2px;
	background-color: #333;
	margin: 2px 0;
	transition: 0.4s;
}

.expand .bar1 {
	-webkit-transform: rotate(90deg) translate(7px, -7px);
	transform: rotate(90deg) translate(4px, -4px);
}

.expand .bar2 {
	-webkit-transform: rotate(90deg) translate(-4px, 4px);
	transform: rotate(90deg) translate(0px, 0px);
}

.expand .bar3 {
	-webkit-transform: rotate(90deg) translate(-15px, 15px);
	transform: rotate(90deg) translate(-4px, 4px);
}
</style>