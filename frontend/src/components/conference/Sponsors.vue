<template>
	<div id="sponsors">
		<div class="container">
			<div class="section-head">
				<h2>Thank You to Our Sponsors</h2>
			</div>
			<div class="sponsor-grid">
				<div class="sponsor-tile"><a href="https://www.intel.com/" target="_blank" rel="noopener noreferrer"><img class="tier-one" src="/img/sponsors/intel-ai-logo.png" alt="Intel Logo"/></a></div>
<!-- 				<div class="sponsor-tile"><a href="https://www.malong.com/" target="_blank" rel="noopener noreferrer"><img class="tier-one" src="/img/sponsors/malong-technologies-logo.png" alt="Malong Technologies Logo"/></a></div>
				<div class="sponsor-tile"><a href="http://www.nvidia.com/" target="_blank" rel="noopener noreferrer"><img class="tier-two" src="/img/sponsors/nvidia-logo.jpg" alt="Nvidia Logo"/></a></div>
				<div class="sponsor-tile"><a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img class="tier-two" src="/img/sponsors/facebook-logo.jpg" alt="Facebook Logo"/></a></div>
				<div class="sponsor-tile"><a href="https://www.cra.com/" target="_blank" rel="noopener noreferrer"><img class="tier-three" src="/img/sponsors/charles-river-analytics-logo.png" alt="Charles River Analytics Logo"/></a></div>
				<div class="sponsor-tile"><a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer"><img class="tier-three" src="/img/sponsors/amazon-logo.jpg" alt="Amazon Logo"/></a></div>
				<div class="sponsor-tile"><a href="https://www.redhat.com/" target="_blank" rel="noopener noreferrer"><img class="tier-three" src="/img/sponsors/redhat-logo.png" alt="RedHat Logo"/></a></div> -->
			</div>
		<div class="become-sponsor"><a class="cta-button" href="mailto:sponsors@machineintelligence.cc">Become A Sponsor</a></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'About',
	}
</script>

<style scoped>

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	/*border: 1px solid #5d5499;*/
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

.section-head {
	padding: 40px 0 0 0;
	margin: 0 50px;
}

.section-head h2 {
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 1.6em;
	font-weight: 600;
	padding: 20px;
	margin: 0;
	display: inline-block;
}

#sponsors .section-head  {
	text-align: center;
}

#sponsors .section-head h2 {
	color: #fff;
	background: #5d5499;
}

#sponsors .sponsor-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 50px;
}

.sponsor-grid .sponsor-tile {
	padding: 0 50px 20px 50px;
}

.sponsor-grid .sponsor-tile img.tier-one {
	width: 170px;
}

.sponsor-grid .sponsor-tile img.tier-two {
	width: 150px;
}

.sponsor-grid .sponsor-tile img.tier-three {
	width: 130px;
}

.become-sponsor {
	display: flex;
	justify-content: center;
	padding: 50px 0;
}

</style>