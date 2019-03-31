<template>
	<div class='container'>
		<div class="result">
			<div>
				<a :href="'/'+item.url">{{ item.first_name+' '+item.last_name }}</a>
			</div>
		</div>
	</div>
</template>

<script>
import Vote from '@/components/Vote'
export default {
	name: 'ProfileCell',
	components: {
		Vote
	},
	data() {
		return {
			name: ''
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