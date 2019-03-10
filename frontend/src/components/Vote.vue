<template>
	<div class='container'>
		<div id="votes">
			<span id="total">{{total}}</span>
			<button v-if="show" v-on:click="upvote()">+</button>
			<button v-if="show" v-on:click="downvote()">-</button>
		</div>
	</div>
</template>

<script>
import ContentService from '@/services/ContentService'
export default {
	data() {
		return {
			total: this.likes - this.dislikes,
			user_id: this.$store.state.userInfo.id,
			show: this.$store.state.isLoggedIn
		}
	},
	methods: {
		async upvote() {
			ContentService.upvote({ content_id: this.content_id, profile_id: this.user_id })
			.then((data) => {
				this.total = data.data.total != undefined ? data.data.total : this.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		async downvote() {
			ContentService.downvote({ content_id: this.content_id, profile_id: this.user_id })
			.then((data) => {
				this.total = data.data.total != undefined ? data.data.total : this.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		}
	},
	props: ['content_id', 'likes', 'dislikes']
}
</script>

<style scoped>

button {
	font-size: 0.9em;
	font-weight: bold;
}

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

#votes button:hover {
	color: #5d5499;
}

#total {
	width: 100%;
	margin: 0 auto;
	text-align: center;
}
</style>