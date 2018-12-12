<template>
  <div id="app">
    <router-view/>
    <div id="footer">
    	<p>© 2018, Machine Intelligence Community, Inc.</p>
      <p><a href="/about"> about</a></p>
    </div>
  </div>
</template>

<style>

a {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}

.container {
	max-width: 1080px;
	margin: 0 auto;
}

button {
  border: none;
  box-shadow: none;
  outline: none;
  background: #545f99;
  padding: 5px 10px;
  color: #fff;
}

textarea, input {
  border: 0px;
  outline: 0px;
  background: transparent;
  padding: 5px;
  margin: 10px 0;
  resize: none;
  font-size: 1.5em;
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
}

#app .main {
  flex: 1;
}

#footer {
	display: flex;
	justify-content: center;
}

#footer p {
	margin: 10px;
	font-size: 12px;
	color: #525252;
}

</style>
