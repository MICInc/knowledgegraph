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
				<div v-if="!editable">
					<button v-on:click="follow($event)">Follow</button>
				</div>
			</div>
			<nav class="sections">
				<ul>
					<li class="tab" v-for="(sect, index) in sections">
						<a :href="'/'+url+sect.href" v-on:click="switch_section(sect.name)">
							{{ sect.name.toUpperCase() }}
							<span class="count">{{ profile[sect.name] }}</span>
						</a>
					</li>
				</ul>
				<!-- <button v-on:click="clear_library()">clear</button> -->
			</nav>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ProfileService from '@/services/ProfileService'
import Comments from '@/components/profile/Comments'
import Followers from '@/components/profile/Followers'
import Following from '@/components/profile/Following'
import Library from '@/components/profile/Library'
import Publications from '@/components/profile/Publications'
import ProfilePic from '@/components/profile/ProfilePic'
import router from '@/router'

export default {
	name: 'content',
	beforeMount() {
		this.a_edit();
		this.getContent();
	},
	components: {
		PageNav,
		Comments,
		Followers,
		Following,
		Library,
		Publications,
		ProfilePic
	},
	data () { // explicitely list all properties here for two-way binding so can later implementing editing feature
		return {
			editable: false,
			token: this.$store.state.accessToken,
			url: this.$route.params.id,
			user_id: this.$store.state.userInfo.id,
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
		async clear_library() {
			ProfileService.clearLibrary({ user_id: this.user_id })
			.then(function(data) {
			})
			.catch(function(err) {
			});
		},
		async a_edit() {
			ProfileService.canEdit({ params: { user_id: this.user_id, token: this.token, url: this.url }})
			.then((resp) => {
				if(resp.data.editable) this.editable = resp.data.editable;
				console.log(this.editable);
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
		switch_section(name) {
			// console.log(this.url);
			// router.push({ path: '/profile/'+this.url+'/'+name });
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
