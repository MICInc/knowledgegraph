<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container">
			<img id="cover" src="/img/cover.jpg">
			<div id="about">
				<div id="left">
					<h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
				</div>
			</div>
			<nav class="sections">
				<ul>
					<li class="tab" v-for="(sect, index) in sections">
						<a :href="'/profile/'+url+sect.href" v-on:click="switch_section(sect.name)">
							{{ sect.name.toUpperCase() }}
							<span class="count">{{ sect.total }}</span>
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

export default {
	name: 'content',
	beforeMount() {
		this.getContent().then(data => {
			this.profile = data;
		});
		
		this.user_id = this.$store.state.userInfo.id;
	},
	components: {
		PageNav,
		Comments,
		Followers,
		Following,
		Library,
		Publications
	},
	data () { // explicitely list all properties here for two-way binding so can later implementing editing feature
		return {
			url: this.$route.params.id,
			user: {
				id: 0
			},
			profile: {},
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
				console.log(data);
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		async getContent() {
			return await ProfileService.getProfile({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		switch_section(name) {
			console.log(this.url);
			// router.push({ path: '/profile/'+this.url+'/'+name });
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

#cover {
	width: 1080px;
	height: 340px;
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
