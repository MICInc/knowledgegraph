<template>
	<div class="jumbo">
		<vue-particles color="#5d5499"
			:particleOpacity="0.5"
      :particlesNumber="120"
      :particleSize="5"
      linesColor="#5d5499"
      :lineOpacity="0.3"
      :moveSpeed="2"
      :hoverEffect="false"
      :clickEffect="false"
		 id="particles-js"></vue-particles>
		<div class="container">
			<div class="top">
				<div class="logo"><img src="/img/mic-logo.png"" alt="MIC Conference Logo" /></div>
				<div class="heading">
					<div class="main-heading">
						<h1>Machine Intelligence Conference</h1>
					</div>
					<div class="sub-heading">
						<h2>Sep. 7th, 2019</h2><h3>9 AM - 5:30 PM</h3><br>
						<h2>Boston University's Center for Integrated Life Sciences & Engineering and</h2>
						<h2>Software & Application Innovation Lab</h2>
					</div>
				</div>
			</div>
			<div class="cta">
				<router-link class="cta-button" tag="a" to="/conference">Register</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Jumbo',
	}
</script>

<style scoped>

.jumbo {
	margin-top: -50px;
}

.cta-button {
	display: block;
	border: none;
	box-shadow: none;
	outline: none;
	padding: 15px 55px;
	border-radius: 0px;
	background: #e38484;
	color: #fff;
	font-family: 'Avenir', sans-serif;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-transform: uppercase;
	font-size: .8em;
	letter-spacing: 1px;
}

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
}

#particles-js {
	position: absolute;
	z-index: -1;
	height: 100vh;
	width: 100%;
	top: 0;
	left: 0;
}

.jumbo .container {
	border: none;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.top {
	flex: 1;
}

.jumbo .logo {
	margin: 40px 0;
}

.jumbo .logo img {
	width: 55px;
}

.heading {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.heading .main-heading {
	padding: 30px 20px;
	margin-bottom: 35px;
}

.heading .main-heading h1 {
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 2.2em;
	font-weight: 400;
	color: #5d5499;
	display: inline;
}

.heading .sub-heading {
	padding: 17px;
}

.heading .sub-heading h2 {
	font-size: 1.7em;
	font-weight: 400;
	letter-spacing: 1px;
	color: #5d5499;
	margin: 0
}

.heading .sub-heading h3 {
	font-size: 1.5em;
	font-weight: 400;
	letter-spacing: 1px;
	color: #5d5499;
	margin: 0
}

.jumbo .cta {
	margin-left: auto;
	margin-bottom: 80px;
	display: flex;
}

</style>