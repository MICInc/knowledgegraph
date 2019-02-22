<template>
	<div class="main-conference">
		<nav v-if="viewSideNav" v-on:click="toggleViewSideNav" id="hidden-nav">
				<ul>
						<li>
								<h3>Menu</h3>
						</li>
						<li><a href="#about">About</a></li>
						<li><a href="#location-info">Location Info</a></li>
						<li><a href="#our-community">Our Community</a></li>
						<li><a href="#sponsors">Sponsors</a></li>
						<li><a href="#committee">Conference Committee</a></li>
				</ul>
		</nav>
		<ul v-if="!viewSideNav" v-on:click="toggleViewSideNav" id="sidebar">
			<li></li>
			<li></li>
			<li></li>
		</ul>
		<div class="content-wrapper">
			<Jumbo></Jumbo>
			<About></About>
			<LocationInfo></LocationInfo>
			<OurCommunity></OurCommunity>
			<Sponsors></Sponsors>
			<Committee></Committee>
			<Footer></Footer>
		</div>
	</div>
</template>

<script>
	import Jumbo from '@/components/conference/Jumbo.vue'
	import About from '@/components/conference/About.vue'
	import LocationInfo from '@/components/conference/LocationInfo.vue'
	import OurCommunity from '@/components/conference/OurCommunity.vue'
	import Sponsors from '@/components/conference/Sponsors.vue'
	import Committee from '@/components/conference/Committee.vue'
	import Footer from '@/components/conference/Footer.vue'

	export default {
		name: 'oldConference',
		components: {
			Jumbo,
			About,
			LocationInfo,
			OurCommunity,
			Sponsors,
			Committee,
			Footer,
		},

		data () {
			return {
				viewSideNav: false,
			}
		},

		methods: {
			toggleViewSideNav () {
				this.viewSideNav = !this.viewSideNav
			}
		}
	}
</script>

<style scoped>

.content-wrapper {
	margin-left: 50px;
}

#sidebar {
	width: 50px;
	background: #545f99;
	position: fixed;
	height: 100vh;
	top: 0;
	left: 0;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

#sidebar li {
	background: #fff;
  width: 16px;
  height: 5px;
  margin-bottom: 10px;
  border-radius: 2px;
}

#hidden-nav {
	background: #545f99;
	position: fixed;
	height: 100vh;
	width: 250px;
	transition: 0.4s;
	box-shadow: #585d7a 1px 0 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

#hidden-nav ul {
	display: flex;
	flex-direction: column;
	margin: 0 25px;
}

#hidden-nav ul li h3 {
	color: #fff;
	text-transform: uppercase;
	display: inline-block;
	padding-bottom: 2px;
	border-bottom: 3px solid #fff;
}

#hidden-nav ul li {
	border-bottom: 1px solid #fff;
}

#hidden-nav ul li a {
	display: block;
	padding: 15px 0 15px 5px;
	color: #fff;
}

#hidden-nav ul li a:hover {
	background: #717cb2;
}

#hidden-nav .cta {
	margin: 25px;
}

#hidden-nav .cta a.cta-button:first-child {
	margin-bottom: 20px;
}

nav#viewable-nav .cta a.cta-button {
	display: block;
	padding: 15px;
	text-align: center;
}

</style>