<template>
	<div id="sponsors">
		<div class="container">
			<div class="section-head">
				<h2>Thank You to Our Sponsors</h2>
			</div>
			<div class="sponsor-grid">
				<div class="sponsor-tile">
					<a v-for="(s, index) in sponsors" :href="s.href" target="_blank">
						<img :class="s.tier" :src="s.src" :alt="s.alt"/>
					</a>
				</div>
			</div>
		<div class="become-sponsor"><a class="cta-button" href="mailto:sponsors@machineintelligence.cc">Become A Sponsor</a></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Sponsors',
		data() {
			return {
				sponsors: [
					{
						href: 'https://mitibmwatsonailab.mit.edu/',
						tier: 'tier-two',
						src: '/img/sponsors/mit-ibm-logo.png',
						alt: 'IBM'
					}
				]
			}
		}
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

.sponsor-grid .sponsor-tile a {
	margin: 10px 50px 20px 50px;
}

.sponsor-grid .sponsor-tile img.partner {
	height: 70px;
}


.sponsor-grid .sponsor-tile img.tier-one {
	height: 100px;
}

.sponsor-grid .sponsor-tile img.tier-two {
	height: 110px;
}

.sponsor-grid .sponsor-tile img.tier-three {
	height: 150px;
}

.become-sponsor {
	display: flex;
	justify-content: center;
	padding: 50px 0;
}

</style>