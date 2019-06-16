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
	methods: {
		add() {
			this.subseq.splice(this.subseq.length-1, 0, this.new_sub);
			this.new_sub = '';
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
</style>