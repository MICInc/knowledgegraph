<template>
	<div id="prereq">
		<textarea v-model="prereq" placeholder="Prerequisites"></textarea>
	</div>
</template>

<script>
export default {
	data() {
		return {
			prereq: []
		}
	},
	watch: {
		prereq: {
			deep: true,
			immediate: true,
			handler(curr, prev) {
				this.$nextTick(function() {
					this.$emit('update', this.prereq);
				});
			}
		}
	}
}
</script>

<style>
#prereq {
	width: 50%;
	float: left;
	margin: 0;
}

#prereq textarea {
	height: 100%;
	width: 95%;
}
</style>