<template>
	<div class="main-conference">
		<nav v-if="viewSideNav" v-on:click="toggleViewSideNav" id="hidden-nav">
			<ul>
				<li>
					<h3>Menu</h3>
				</li>
				<li v-for="(item, index) in menu"><a :href="item.href">{{ item.name }}</a></li>
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
			<Community></Community>
			<Committee></Committee>
			<Sponsors></Sponsors>
			<Footer></Footer>
		</div>
	</div>
</template>

<script>
	import Jumbo from '@/components/conference/Jumbo.vue'
	import About from '@/components/conference/About.vue'
	import LocationInfo from '@/components/conference/LocationInfo.vue'
	import Community from '@/components/conference/Community.vue'
	import Sponsors from '@/components/conference/Sponsors.vue'
	import Committee from '@/components/conference/Committee.vue'
	import Footer from '@/components/conference/Footer.vue'

	export default {
		name: 'oldconf',
		components: {
			Jumbo,
			About,
			LocationInfo,
			Community,
			Sponsors,
			Committee,
			Footer,
		},

		data () {
			return {
				menu: [
					{
						name: 'About',
						href: '#about'
					},
					{
						name: 'Location Info',
						href: '#location-info'
					},
					{
						name: 'Our Community',
						href: '#our-community'
					},
					{
						name: 'Sponsors',
						href: '#sponsors'
					},
					{
						name: 'Conference Committee',
						href: '#committee'
					},
					// {
					// 	name: 'Schedule',
					// 	href: '/conference/schedule/'+(new Date()).getFullYear()
					// }
				],
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
	background: #5d5499;
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
	background: #5d5499;
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
	background: #655ba5;
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