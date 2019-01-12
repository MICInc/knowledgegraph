<template>
	<div id="mic-container">
		<PageNav></PageNav>
		<div id="container">
			<div id="header">
				<div id="profile-pic-container">
					<img id="profile-pic">
				</div>
				<div id="profile-content">
					<div id="community-metrics">
						<span class="metric">{{ profile.content_count }} CONTENT</span>
						<!-- <li class="metric">{{ profile.event_count }} EVENTS</li> -->
						<!-- <li class="metric">{{ profile.member_count }} MEMBERS</li> -->
					</div>
					<div id="about">
						About
					</div>
					<ul id="menu">
						<li>
							MAIN
						</li>
						<li>
							TEAM
						</li>
					</ul>
				</div>
			</div>
			<div id="content">
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import CommunityService from '@/services/CommunityService'

export default {
	name: 'mic-container',
	components: {
		PageNav
	},
	data() {
		return {
			url: this.$route.params.id,
			profile: {
				content_count: 0,
				event_count: 0,
				member_count: 0
			}
		}
	},
	methods: {
		async getPage() {
			return await CommunityService.getPage({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			});
		}
	},
	mounted() {
		console.log(this.url);
		this.getPage().then(data => {
			this.profile = data;
		});
	}
}
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	margin: 0 180px;
}
#header {
	background-color: blue;
	height: 150px;
}
#profile-pic-container {
	height: 150px;
	width: 150px;
	background-color: black;
	float: left;
}
#menu li {
	display: inline;
	margin: 1em;
	font-weight: 500;
}
#profile-content {
	width: 100%;
	flex-grow: 1;
}
#community-metrics {
	margin-left: auto;
	margin-right: auto;
	background-color: yellow;
	display: inline-block;
}
#community-metrics li{
	display: inline;
}
.metric {
	margin: 1em;
}
</style>