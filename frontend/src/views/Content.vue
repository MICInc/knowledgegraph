<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container" v-if="check_content()">
			<div class="article-control-bar">
				<router-link v-if="editable" tag="a" :to="'/add/'+url+'/edit'">Edit</router-link>
				<button class="modal" type="button" v-on:click="share()">Share</button>
				<button class="modal" type="button" v-on:click="report_abuse()">...</button>
			</div>
			<h2>{{ content.title }}</h2>
			<span class='author' v-for='author in content.authors'>
				<a :href="'/'+author.url">{{ author.first_name+' '+author.last_name }}</a>
			</span><br>
			<Prereq></Prereq>
			<Subseq></Subseq>
			<Abuse
				:url="url"
				:content_id="content_id"
				v-show="isAbuseModalVisible" 
				v-on:close="close_report()">
			</Abuse>
			<Share
				:url="url"
				:content_id="content_id"
				v-show="isShareModalVisible" 
				v-on:close="close_share()">
			</Share>
			<div v-for="c in content.publication">
				<div class="article-info">
					<figure v-if="c.tag == 'img'">
						<img class="image-content" :src="c.src">
						<figcaption class="caption">{{ c.caption }}</figcaption>
					</figure>
					<div>
						<hr v-if="c.tag == 'hr'">
					</div>
					<p v-if="c.tag == 'p'" v-html="c.html"></p>
				</div>
			</div>
			<div id="bibtex" class="meta-info">
				<h4>BibTeX citation</h4>
				<span>bibtex</span>
			</div>
			<Footer></Footer>
		</div>
		<NotFoundMsg v-else></NotFoundMsg>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import ContentService from '@/services/ContentService'
import Footer from '@/components/Footer'
import NotFoundMsg from '@/components/NotFoundMsg'
import Vote from '@/components/Vote'
import Abuse from '@/components/form/AbuseModal'
import Share from '@/components/form/ShareModal'
import Prereq from '@/components/form/Prereq'
import Subseq from '@/components/form/Subseq'

export default {
	name: 'Content',
	created() {
		// window.addEventListener('beforeunload', this.cleanup);
	},
	beforeMount() {
		this.edit();
		this.get_content();
	},
	components: {
		PageNav,
		Footer,
		NotFoundMsg,
		Vote,
		Abuse,
		Share,
		Prereq,
		Subseq
	},
	data () {
		return {
			content_id: '',
			url: this.$route.params.id,
			content: {},
			user_id: this.$store.state.userInfo.id,
			token: this.$store.state.accessToken,
			editable: false,
			isShareModalVisible: false,
			isAbuseModalVisible: false,
		}
	},
	methods: {
		async edit() {
			ContentService.canEdit({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
				if(resp.data.editable) this.editable = resp.data.editable;
			})
			.catch((error) => {
				this.editable = false;
			});
		},
		async get_content() {
			ContentService.getContent({ params: { user_id: this.user_id, url: this.url } })
			.then((data) => {
				if(data.data) {
					this.content_id = data.data.id;
					this.content = data.data;
				}
			})
			.catch((error) => {
				console.log('Page not found');
			});
		},
		check_content() {
			return this.content != null && this.content.constructor === Object && Object.keys(this.content).length > 0;
		},
		share() {
			this.isShareModalVisible = true;
		},
		report_abuse() {
			this.isAbuseModalVisible = true;
		},
		close_report() {
			this.isAbuseModalVisible = false;
		},
		close_share() {
			this.isShareModalVisible = false;
		}
	}
}
</script>

<style scoped>
button {
	border: none;
}

.article-control-bar {
	border-bottom: 1px solid #dedede;
}

.article-info {
	width: 1080px;
	padding: 0px;
}

.article-info figure {
	margin: 0px;
	width: 100%;
}

.caption {
	text-align: center;
	font-size: 0.8em;
	color: #606060;
}

.image-content {
	display: block;
	margin: auto;
	max-width: 1080px;
	max-height: auto;
	vertical-align: middle; 
	border: 1px solid transparent;
}

#authors {
	font-size: 0.85em;
	font-weight: bold;
	margin-bottom: 0;
	padding-bottom: 0;
}

.author {
	margin-top: 0;
	padding: 0;
	font-size: 0.85em;
}

.edit {
	font-size: 0.85em;
	background-color: yellow;
}

.modal {
	display: table-cell;
	vertical-align: middle;
}

#bibtex {
	font-size: 0.85em;
}

#bibtex h4 {
	margin-bottom: 0px;
}

</style>
