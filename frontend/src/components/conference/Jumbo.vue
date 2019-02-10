<template>
	<div class="jumbo">
		<div class="container">
			<div class="top">
				<div class="logo"><img src="/img/mic-logo.png"" alt="MIC Conference Logo" /></div>
				<div class="heading">
					<div class="main-heading">
						<h1>Machine Intelligence Conference</h1>
					</div>
					<div class="sub-heading">
						<h2>Nov. 3rd, 2018 - 6th Floor of MIT Media Lab </h2>
					</div>
				</div>
			</div>
			<div class="cta"><a class="cta-button" href="/schedule">View the Schedule</a></div>
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
	font-family: Lato;
	text-transform: uppercase;
	font-size: .8em;
	letter-spacing: 1px;
}

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	border: 1px solid #545f99;
}

	#particles-js canvas {
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
	background: #545f99;
	padding: 30px 20px;
	margin-bottom: 35px;
}

.heading .main-heading h1 {
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 2.2em;
	font-weight: 400;
	color: #fff;
	display: inline;
}

.heading .sub-heading {
	background: #545f99;
	padding: 17px;
}

.heading .sub-heading h2 {
	font-size: 1.7em;
	font-weight: 400;
	letter-spacing: 1px;
	color: #fff;
	margin: 0
}

.jumbo .cta {
	margin-left: auto;
	margin-bottom: 80px;
	display: flex;
}

</style>