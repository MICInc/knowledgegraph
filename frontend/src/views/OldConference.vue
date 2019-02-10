<template>
	<div class="main-conference">
		<Jumbo></Jumbo>
		<About></About>
		<LocationInfo></LocationInfo>
		<OurCommunity></OurCommunity>
		<Sponsors></Sponsors>
		<Committee></Committee>
		<Footer></Footer>
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
		}
	}
</script>

<style scoped>



</style>