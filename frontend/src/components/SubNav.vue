<template>
	<nav id="subnav">
		<ul>
			<li><router-link tag="a" to="/conference"><b>CONFERENCE</b></router-link></li>
			<li><router-link tag="a" to="/community"><b>COMMUNITY</b></router-link></li>
			<li><router-link tag="a" to="/add"><b>NEW ARTICLE</b></router-link></li>
		</ul>
	</nav>
</template>

<script>
</script>

<style>
#subnav {
	margin: 5px 0;
	height: 1.5em;
	width: 100%;
	padding-left: 25%;
	position: fixed;
	background-color: #fff;
}

#subnav ul {
	list-style: none;
	display: flex;
	align-items: center;
}

#subnav ul li {
	margin-left: 15px;
}

#subnav ul li:first-child {
	margin-left: 0;
}

#subnav ul li a {
	text-decoration: none;
	font-weight: 400;
	font-size: 12px;
	color: #000;
}

#subnav ul li a:hover {
	color: #655ba5;
}
</style>