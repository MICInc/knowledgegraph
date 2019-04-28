<template>
	<header>
		<span id="home">
			<router-link class="logo" tag="a" to="/">
				<img src="/img/mic-logo-nav.png"" alt="MIC Conference Logo" />
			</router-link>
		</span>
		<input
			v-if="isLoggedIn"
			class="search" 
			type="search"
			name="q"
			placeholder="SEARCH" 
			v-on:keydown.enter.prevent="search()"
			v-model="query">
		<nav id=right>
			<div v-if="!isLoggedIn">
				<ul>
					<li><router-link tag="a" to="/signup"><b>JOIN</b></router-link></li>
					<li><router-link tag="a" to="/login"><b>LOGIN</b></router-link></li>
				</ul>
			</div>
			<div v-else>
				<div class="menu">
					<div class="prof-pic">
						<a :href="'/'+url">
							<img v-if="picture.length > 0" :src="picture">
							<div v-else></div>
						</a>
					</div>
					<ul class="dropdown">
						<li v-for="(item, index) in menu">
							<router-link tag="a" :to="item.href">{{ item.name }}</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import AuthMixin from '@/mixins/AuthMixin';
import router from '@/router';

export default {
	name: 'PageNav',
	beforeMount() {
		if(this.stored_pic !== undefined) this.picture = this.stored_pic;
	},
	created: function() {  
 		document.title = 'Machine Intelligence Community'
 	},
 	computed: {
		isLoggedIn() {
			return this.$store.state.isLoggedIn
		},
		stored_pic() {
			return this.$store.state.userInfo.picture;
		},
		url() {
			return this.$store.state.userInfo.url
		}
	},
	data () {
		return {
			picture: '',
			query: '',
			menu: [
				{
					href: '/settings',
					name: 'Settings'
				},
				{
					href: '/logout',
					name: 'Logout'
				}
			]
		}
	},
	methods: {
		search() {
			router.push({path: '/search', query: {term: this.query} });
		}
	},
	mixin:[AuthMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	position: fixed;
	top: 0;
	min-width: 1080px;
	background: #fff;
	margin: 0 auto;
}

nav {
	padding: 0 20px;
}

#right {
	display: flex;
	justify-content: flex-end;
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
}

nav ul li:first-child {
	margin-left: 0;
}

nav ul li a {
	text-decoration: none;
	font-weight: 400;
	font-size: 14px;
}

.menu {
	margin: auto;
	justify-content: flex-end;
	display: inline-block;
	min-width: 38px;
	height: 100%;
}

.menu:hover .dropdown {
	display: block;
	width: 100px;
}

.dropdown {
	padding: 0;
	margin-top: 40px;
	display: none;
	position: absolute;
	background-color: #f1f1f1;
	min-width: 100px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
}

.dropdown li {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 2em;
	background-color: white;
}

.dropdown li:hover {
	width: 100%;
	margin: 0;
	padding: 0;
}

.dropdown li a:hover {
	width: 100%;
	height: 100%;
	background-color: #f4f4f4;
	margin: 0;
}

.dropdown li a {
	margin: auto;
	padding: auto;
	width: 100%;
	height: 100%;
	display: inline-block;
	font-size: .8em;
	color: black;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}


.prof-pic {
	margin: 0 10px;
	float: left;
	width: 38px;
	height: 38px;
}

.prof-pic img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.prof-pic div {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #F9F9F9;
	border: solid;
	border-width: 1px;
	border-color: #e0e0e0;
}

input.search {
	border: transparent;
	height: auto;
	width: 50%;
	border-radius: 3px;
	padding: 5px 5px;
	font-size: 12px;
}

#home {
	margin-top: 0px;
	font-size: 0.85em;
}

.logo {
	margin: 40px 0;
}

.logo img {
	width: 38px;
}

</style>
