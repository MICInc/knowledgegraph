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
					<a :href="'/'+url">
						<img v-if="picture.length > 0" :src="picture">
						<div v-else></div>
					</a>
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
	beforeMount() {
		var stored_pic = this.$store.state.userInfo.picture;
		if(stored_pic !== undefined) this.picture = stored_pic;
	},
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
			picture: '',
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

.menu {
	display: flex;
	justify-content: flex-end;
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
