<template>
	<div class="fade-block">
		{{ message }}
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	props: ['message']
}
</script>

<style scoped>
.fade-block {
	width: auto;
	-webkit-animation: fadeinout 4s linear forwards;
	animation: fadeinout 4s linear forwards;
}

@-webkit-keyframes fadeinout {
	0%,100% { opacity: 0; }
	50% { opacity: 1; }
}

@keyframes fadeinout {
	0%,100% { opacity: 0; }
	50% { opacity: 1; }
}
</style>