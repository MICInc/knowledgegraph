<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container">
			<ProfilePic
				:editable="editable"
				:token="token"
				:user_id="user_id"
				:url="url">
			</ProfilePic>
			<div id="about">
				<div id="left">
					<h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
				</div>
				<div v-if="!editable && logged_in">
					<button v-on:click="follow($event)">Follow</button>
				</div>
			</div>
			<nav class="sections">
				<ul>
					<li class="tab" v-for="(sect, index) in sections">
						<a :href="'/'+url+sect.href">
							{{ sect.name.toUpperCase() }}
							<span class="count">{{ profile[sect.name] }}</span>
						</a>
					</li>
				</ul>
			</nav>
			<!-- <router-view :to="{ name: 'library', params: { editable: editable } }"></router-view> -->
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ProfileService from '@/services/ProfileService'
import ProfilePic from '@/components/profile/ProfilePic'
import router from '@/router'

export default {
	name: 'content',
	beforeMount() {
		this.edit();
		this.getContent();
	},
	components: {
		PageNav,
		ProfilePic
	},
	computed: {
		token() {
			return this.$store.state.accessToken;
		},
		url() {
			return this.$route.params.id;
		},
		user_id() {
			return this.$store.state.userInfo.id;
		},
		logged_in() {
			return this.$store.state.isLoggedIn;
		}
	},
	data () { // explicitely list all properties here for two-way binding so can later implementing editing feature
		return {
			editable: false,
			profile: {
				comments: 0,
				first_name: '',
				followers: 0,
				following: 0,
				last_name: '',
				library: 0,
				publications: 0
			},
			sections: [
				{
					name: 'comments',
					href: '/comments',
					total: 0
				},
				{
					name: 'publications',
					href: '/publications',
					total: 0
				},
				{
					name: 'library',
					href: '/library',
					total: 0
				},
				{
					name: 'followers',
					href: '/followers',
					total: 0
				},
				{
					name: 'following',
					href: '/following',
					total: 0
				}
			]
		}
	},
	methods: {
		async edit() {
			ProfileService.canEdit({ user_id: this.user_id, token: this.token, url: this.url })
			.then((resp) => {
				if(resp.data.editable) this.editable = resp.data.editable;
			})
			.catch((resp) => {
				this.editable = false;
			});
		},
		async follow(event) {
			ProfileService.follow({ user_id: this.user_id, token: this.token, url: this.url })
			.then((resp) => {
				this.profile.followers = resp.data.followers;
			});
		},
		async getContent() {
			return await ProfileService.getProfile({ params: { url: this.url }})
			.then((resp) => {
				if(resp.data != undefined && resp.status == 200) this.profile = resp.data;
			})
			.catch(function(err) {
				router.push({ name: 'notfound' });
			});
		},
		save(profile) {
		},
		update(data) {
			for(var k in data) this.profile[k] = data[k];
		}
	}
}
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}

nav ul {
	list-style: none;
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
}

nav ul li {
	margin-left: 15px;
	font-weight: bold;
	font-size: 14px;
}

nav ul li:first-child {
	margin-left: 0;
}

nav ul li a {
	text-decoration: none;
	color: #000;
}

nav ul li a:hover {
	color: #655ba5;
}

nav ul li .count {
	margin-left: 5px;
}

#about {
	display: flex;
}

#about #right {
	width: 60%;
	margin-top: 10px;
	display: flex;
	justify-content: flex-end;
}

</style>
