<template>
	<div class='container'>
		<div class="result">
			<!-- <div class="vote">
				<Vote :likes="item.likes" :dislikes="item.dislikes" :content_id="item.id" :abbrev="true"></Vote>
			</div> -->
			<div class="item">
				<a :href="'/content/'+item.url">{{ item.title }}</a><br>
				<span>{{ item.preview }}</span><br>
				<span class="search-article-meta">modified: {{ (new Date(item.last_modified)).toDateString() }}</span>
				<span class="search-article-meta">created: {{ (new Date(item.date_created)).toDateString() }}</span>
			</div>
		</div>
	</div>
</template>

<script>
// import Vote from '@/components/Vote'
export default {
	name: 'ArticleCell',
	components: {
		// Vote
	},
	data() {
		return {
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

.item {
	width: auto;
	height: auto;
	margin: 0px;
	padding: 0px;
	display: inline-block;
}

.search-article-meta {
	font-size: 0.8em;
	margin-right: 1em;
}
</style>