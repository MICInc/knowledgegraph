<template>
		<div :class="{ default: true, expand: open }" 
			v-on:click.prevent="toggle()">
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
		},
		toggle() {
			this.change();
			this.$emit('change', this.open);
		}
	},
	props: ['index'],
	watch: {
		index: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.index = curr;
			}
		}
	}
}
</script>

<style scoped>
.default {
	cursor: pointer;
}

.bar1, .bar2, .bar3 {
	width: 14px;
	height: 2px;
	background-color: #b7b7b7;
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