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
	methods: {
		add() {
			this.prereq.splice(this.prereq.length-1, 0, this.new_pre);
			this.new_pre = '';
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