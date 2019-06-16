<template>
	<div id="subseq">
		<textarea v-model="subseq" placeholder="Subsequent"></textarea>
	</div>
</template>

<script>
export default {
	data() {
		return {
			subseq: ''
		}
	},
	watch: {
		subseq: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.$nextTick(function() {
					this.$emit('update', this.subseq);
				});
			}
		}
	}
}
</script>

<style>
#subseq {
	width: 50%;
	float: right;
	margin: 0;
}

#subseq textarea {
	height: 100%;
	width: 95%;
}
</style>