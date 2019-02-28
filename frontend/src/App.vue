<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>

export default {
}
</script>

<style>

a {
	text-decoration: none;
}

body {
	margin: 0;
	padding: 0;
	font-family: 'Avenir', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.container {
	min-width: 1080px;
	margin: 0 auto;
}

button {
	border: none;
	box-shadow: none;
	outline: none;
	background-color: transparent;
}

button:hover {
	cursor: pointer;
	color: #56277a;
}

textarea, input {
	outline: 0px;
	background: transparent;
	padding: 5px;
	margin: 10px 0;
	resize: none;
	font-size: 1em;
}

textarea:focus, input:focus {
	outline: none;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
  margin-top: 50px; /*Should match navbar height*/
}

#app .main {
	flex: 1;
}

</style>
