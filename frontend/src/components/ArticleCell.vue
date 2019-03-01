<template>
	<div class='container'>
		<div class="result">
			<div class="vote">
				<Vote :content_id="content_id"></Vote>
			</div>
			<div class="vote">
				<router-link class="result-header" v-bind:to="'/content/'+item.url">{{ item.title }}</router-link>
			</div>
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
.container {
	flex: 1;
	display: flex;
}

.result {
	flex: 1;
	display: flex;
	border-bottom: solid;
	border-width: thin;
	border-color: #e5e5e5;
	width: 50%;
	height: 80px;
	margin: 10px 0px;
}

.result-header {
	font-size: 1.2em;
	font-weight: bold;
	display: inline-block;
}

.vote {
	width: 50px;
	height: 50px;
	margin: 0px;
	padding: 0px;
	display: inline-block;
}
</style>