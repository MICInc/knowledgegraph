<template>
	<header>
		<span id="home">
			<router-link class="logo" tag="a" to="/">
				<img src="/img/mic-logo-nav.png"" alt="MIC Conference Logo" />
			</router-link>
		</span>
		<input 
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
				<div class="prof-pic">
					<router-link tag="a" :to="'/'+url">
						<img id="test" v-if="picture.length > 0" :src="picture">
					</router-link>
				</div>
				<ul class="menu">
					<li v-for="(item, index) in menu">
						<router-link tag="a" :to="item.href">
							<b>{{ item.name }}</b>
						</router-link>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import router from '@/router'

export default {
	name: 'PageNav',
	created: function() {  
 		document.title = 'Machine Intelligence Community'
 	},
 	computed: {
		isLoggedIn () {
			return this.$store.state.isLoggedIn
		}
	},
	data () {
		return {
			user: this.$store.state.userInfo.first_name,
			url: this.$store.state.userInfo.url,
			picture: this.$store.state.userInfo.picture,
			query: '',
			menu: [
				{
					href: '/logout',
					name: 'LOGOUT'
				}
			]
		}
	},
	methods: {
		search() {
			router.push({path: '/search', query: {term: this.query} });
		}
	}
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
	overflow: hidden;
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

.prof-pic {
	margin: 0;
	float: left;
}

.prof-pic img {
	width: 38px;
	height: 38px;
	border-radius: 50%;
}

.menu {
	display: flex;
	justify-content: flex-end;
	z-index: 1;
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
