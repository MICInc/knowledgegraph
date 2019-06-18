<template>
	<div class="container">
		<PageNav></PageNav>
		<div id="content" v-if="check_content()">
			<h2>{{ content.title }}</h2>
			<ControlBar 
				:editable="editable" 
				:url="url"
				v-on:abuse=""
				v-on:share="">
			</ControlBar>
			<span class='author' v-for='author in content.authors'>
				<a :href="'/'+author.url">{{ author.first_name+' '+author.last_name }}</a>
			</span><br>
			<div class="prereq-subseq-box">
				<Prereq 
					v-if="content.prereqs != undefined && content.prereqs.length > 0" 
					:concepts="content.prereqs">
				</Prereq>
				<Subseq 
					v-if="content.subseqs != undefined && content.subseqs.length > 0" 
					:concepts="content.subseqs">
				</Subseq>
			</div>
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
				<p>{{ content.bibtex }}</p>
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
import Abuse from '@/components/content/AbuseModal'
import Share from '@/components/content/ShareModal'
import Prereq from '@/components/content/Prereq'
import Subseq from '@/components/content/Subseq'
import ControlBar from '@/components/content/ControlBar'

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
		Subseq,
		ControlBar
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
			isAbuseModalVisible: false
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
		open_report() {
			this.isAbuseModalVisible = true;
		},
		open_share() {
			this.isShareModalVisible = true;
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
h2 {
	font-size: 2em;
	margin: 20px 0 0 0;
	padding: 0;
	font-weight: 400;
}

button {
	border: none;
}

#content {
	margin-top: 10px;
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
}

.modal {
	display: table-cell;
	vertical-align: middle;
}

.prereq-subseq-box {
}

#bibtex {
	font-size: 0.85em;
}

#bibtex h4 {
	margin-bottom: 0px;
}

#bibtex p {

}

</style>
