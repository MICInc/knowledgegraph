<template>
	<header>
		<nav id='left'>
			<ul>
				<li><router-link tag="a" to="/"><b>HOME</b></router-link></li>
				<li><router-link tag="a" to="/conference"><b>CONFERENCE</b></router-link></li>
				<li><router-link tag="a" to="/community"><b>COMMUNITY</b></router-link></li>
				<li><router-link tag="a" to="/add"><b>ADD</b></router-link></li>
				<router-view/>
			</ul>
		</nav>
		<input 
			class="search" 
			type="search"
			name="q"
			placeholder="SEARCH" 
			v-on:keydown.enter.prevent="search()"
			v-model="query">
		<nav id=right>
			<ul v-if="!isLoggedIn">
				<li><router-link tag="a" to="/signup"><b>JOIN</b></router-link></li>
				<li><router-link tag="a" to="/login"><b>LOGIN</b></router-link></li>
			</ul>
			<ul v-else>
				<li><router-link tag="a" to="/logout"><b>LOGOUT</b></router-link></li>
			</ul>
		</nav>
	</header>
</template>

<script>
import router from '@/router'

export default {
	name: 'PageNav',

	data () {
		return {
			query: ''
		}
	},

	computed: {
		isLoggedIn () {
			return this.$store.state.isLoggedIn
		}
	},

	methods: {
		search() {
			router.push({path: 'search', query: {term: this.query} })
		}
	},

	created: function() {  
 		document.title = 'Machine Intelligence Community'
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	padding: 0 20px;
	border-bottom: 1px solid #EAEAEA;
}

nav, input {
	width: 33.33%;
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

input.search {
	border: transparent;
	height: auto;
	width: 300px;
	border-radius: 3px;
	padding: 5px 5px;
	font-size: 12px;
}

</style>
