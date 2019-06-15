<template>
	<div class="article-control-bar">
		<router-link v-if="editable" tag="a" :to="'/add/'+url+'/edit'">Edit</router-link>
		<button class="modal" type="button" v-on:click="share()">Share</button>
		<button class="modal" type="button" v-on:click="report_abuse()">...</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		report_abuse() {
			this.$emit('abuse');
		},
		share() {
			this.$emit('share');
		}
	},
	props: ['editable', 'url']
}
</script>


<style scoped>
button {
	border: none;
}

.article-control-bar {
	border-bottom: 1px solid #dedede;
}

.modal {
	display: table-cell;
	vertical-align: middle;
}
</style>