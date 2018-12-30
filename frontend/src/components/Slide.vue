<template>
	<div id="container">
		<canvas id="canvas">

		</canvas>
	</div>
</template>

<script>
export default {
	created() {
		var canvas = document.getElementById('canvas');
		var context = canvas.getContent('2d');
	},
	data() {
		return {
			canvas: {

			},
			context: {
				
			}
		}
	}

}
</script>

<style>
#view {
	width: 100%;
	height: 100%;
}
</style>