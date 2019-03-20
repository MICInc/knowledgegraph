<template>
	<div class='container'>
		<div id="votes">
			<span id="total">{{ format_total | commas }}</span>
			<button :class="{ selected: sentiment == 1 }" v-if="show" v-on:click="upvote()">+</button>
			<button :class="{ selected: sentiment == -1 }" v-if="show" v-on:click="downvote()">-</button>
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
			show: this.$store.state.isLoggedIn,
			token: this.$store.state.accessToken,
			sentiment: 0
		}
	},
	computed: {
		format_total() {
			if(!this.abbrev || this.total < 1000) return this.total;

			var mag = { 'K': 3, 'M': 6, 'B': 9, 'T': 12 };
			for(var i in mag) {
				var div = Math.round(this.total / (Math.pow(10, mag[i])) * 10) / 10;
				if( 0 < div && div < 1000 ) return div+' '+i; 
			}
			return '∞';
		}
	},
	filters: {
		commas(num) {
			if (!num || num == 0) return '0';
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
	methods: {
		async upvote() {
			this.sentiment = 1;
			
			ContentService.upvote({ content_id: this.content_id, profile_id: this.user_id, token: this.token })
			.then((data) => {
				this.total = data.data.total != undefined ? data.data.total : this.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		async downvote() {
			this.sentiment = -1;

			ContentService.downvote({ content_id: this.content_id, profile_id: this.user_id, token: this.token })
			.then((data) => {
				this.total = data.data.total != undefined ? data.data.total : this.total;
			})
			.catch(function(err) {
				console.log(err);
			});
		}
	},
	props: ['content_id', 'likes', 'dislikes', 'abbrev']
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
	background-color: transparent;
}

#votes button:hover {
	color: #5d5499;
}

.selected {
	color: #5d5499;
}

#total {
	width: 100%;
	margin: 0 auto;
	text-align: center;
}
</style>