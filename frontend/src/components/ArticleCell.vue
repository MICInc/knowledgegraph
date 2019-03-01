<template>
	<div class='container'>
		<!-- <Vote :content_id="content_id"></Vote> -->
		<div class="result">
			<router-link class="result-header" v-bind:to="'/content/'+item.url">{{ item.title }}</router-link>
		</div>
	</div>
</template>

<script>
import Vote from '@/components/Vote'
export default {
	name: 'ArticleCell',
	components: {
		Vote
	},
	data() {
		return {
			// content_id
		}
	},
	props: ['item']
}
</script>

<style>
.result-header {
	font-size: 1.2em;
	font-weight: bold;
}

.result {
	border-bottom: solid;
	border-width: thin;
	border-color: #e5e5e5;
	width: 50%;
	height: 80px;
	margin: 10px 0px;
}
</style>