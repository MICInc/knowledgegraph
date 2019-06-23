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
			<div id="name">
				<h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
			</div>
			<nav class="sections">
				<ul>
					<li class="tab" v-for="(sect, index) in sections">
						<a :href="'/'+url+sect.href">
							{{ sect.name | capitalize }}
							<span class="count">{{ profile[sect.name] }}</span>
						</a>
					</li>
				</ul>
				<div id="follow" v-if="!editable && logged_in">
					<button id="follow-btn" v-on:click="follow($event)">{{ follow_text }}</button>
				</div>
			</nav>
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
	name: 'profile',
	beforeMount() {
		this.getContent();
	},
	components: {
		PageNav,
		ProfilePic
	},
	computed: {
		editable() {
			return this.profile.can_edit;
		},
		follow_text() {
			return this.profile.is_following ? 'Following' : 'Follow';
		},
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
			email: this.$store.state.userInfo.email,
			profile: {
				comments: 0,
				first_name: '',
				followers: 0,
				following: 0,
				last_name: '',
				library: 0,
				publications: 0,
				is_following: false,
				can_edit: false
			},
			sections: [
				{
					name: 'comments',
					href: '/comments'
				},
				{
					name: 'publications',
					href: '/publications'
				},
				{
					name: 'library',
					href: '/library'
				},
				{
					name: 'followers',
					href: '/followers'
				},
				{
					name: 'following',
					href: '/following'
				}
			]
		}
	},
	filters: {
		capitalize: function(value) {
			if(!value) return '';
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	methods: {
		async follow(event) {
			ProfileService.follow({ user_id: this.user_id, token: this.token, url: this.url })
			.then((resp) => {
				this.profile.followers = resp.data.followers;
				this.profile.is_following = !this.profile.is_following;
			});
		},
		async getContent() {
			return await ProfileService.getProfile({ params: { email: this.email, token: this.token, url: this.url }})
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

.sections {
	display: flex;
}

.sections ul {
	flex: 1;
	list-style: none;
	display: flex;
	margin: 0;
	padding: 0;
}

.sections ul li {
	margin-left: 2em;
	font-weight: bold;
	font-size: 1em;
}

.sections ul li:first-child {
	margin-left: 0;
}

.sections ul li a {
	text-decoration: none;
	color: #000;
}

.sections ul li a:hover {
	color: #655ba5;
}

.sections ul li .count {
	margin-left: 5px;
}

#name {
	display: flex;
}

#follow {
	display: flex;
	justify-content: flex-end;
}

#follow-btn {
	margin: 0;
	width: 6em;
	height: 1.5em;
}

</style>
