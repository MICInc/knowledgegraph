<template>
	<div class='container'>
		<div id="votes">
			<span id="total">{{total}}</span><br>
			<button v-on:click="upvote()">+</button>
			<button v-on:click="downvote()">-</button>
		</div>
	</div>
</template>

<script>
import ContentService from '@/services/ContentService'
export default {
	data() {
		return {
			total: 0
		}
	},
	methods: {
		async upvote() {
			ContentService.upvote({ content_id: this.content_id, profile_id: this.user_id })
			.then((data) => {
				console.log(data);
				this.total = data.data.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		async downvote() {
			ContentService.downvote({ content_id: this.content_id, profile_id: this.user_id })
			.then((data) => {
				this.total = data.data.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		}
	},
	props: ['content_id', 'user_id']
}
</script>

<style>
.container {
	/*background-color: purple;*/
}

#votes {
	width: 50px;
	height: 50px;
}

#votes span {
	display: inline-block;
}

#votes button {
	display: inline-block;
}

#total {

}
</style>