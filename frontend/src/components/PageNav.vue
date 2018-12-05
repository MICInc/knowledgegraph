<template>
	<header>
		<nav id='left'>
			<ul>
				<li><router-link tag="a" to="/">Home</router-link></li>
				<li><router-link tag="a" to="/conference">Conference</router-link></li>
				<li><router-link tag="a" to="/community">Community</router-link></li>
				<li><router-link tag="a" to="/add">Add</router-link></li>
				<router-view/>
			</ul>
		</nav>
		<input class="search" type="text" placeholder="search" 
			v-on:keydown.enter.prevent="search()" 
			v-model="searchInput" autofocus>
		<nav id=right>
			<ul>
				<li><router-link tag="a" to="/signup">Join</router-link></li>
				<li><router-link tag="a" to="/login">Login</router-link></li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'PageNav',

	data () {
		return {
			searchInput: '',
		}
	},

	methods: {
		search() {
			alert("You searched for " + this.searchInput)
			this.searchInput = ''
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
	border-bottom: 1px solid #3c3c3c;
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
	color: #fff;
	font-weight: 400;
	font-size: 14px;
}

input.search {
	height: auto;
	width: 300px;
	border: none;
	border-radius: 3px;
	padding: 5px 5px;
	font-size: 12px;
	background: #535353;
	color: #fff;
}

</style>
