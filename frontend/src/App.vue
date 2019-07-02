<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import router from '@/router';

export default {
	beforeMount() {
		if(this.token.length > 0) {
			AuthenticationService.verify_token({ token: this.token, email: this.email })
			.then((data) => {
			})
			.catch((err) => {
				router.push({ path: '/logout' });
			});
		}
	},
	data() {
		return {
			token: this.$store.state.accessToken,
			email: this.$store.state.userInfo.email
		}
	}
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
	margin: 20px 0px;
	border-radius: 4px;
	box-shadow: none;
	outline: none;
	background: transparent;
	color: #502984;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	font-size: 1em;
	border-width: 1px;
	border-style: solid;
	transition: border-color .5s ease-in-out;
	-webkit-transition: border-color .5s ease-in-out;
	-moz-transition: border-color .5s ease-in-out;
}

button:hover {
	cursor: pointer;
	border-color: #3d0784;
	border-width: 1px;
	border-style: solid;
	transition: border-color .5s ease-in-out;
	-webkit-transition: border-color .5s ease-in-out;
	-moz-transition: border-color .5s ease-in-out;
}

textarea, input {
	outline: 0px;
	background: transparent;
	padding: 5px;
	margin: 10px 0;
	resize: none;
	font-size: 1em;
	border: none;
	font-family: 'Avenir', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

textarea:focus, input:focus {
	border-style:none
}

select {
}

select::-ms-expand {
    display: none;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

h1 {
	margin-top: 50px;
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
