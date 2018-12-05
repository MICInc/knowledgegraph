<template>
	<div class="conference">
		<PageNav></PageNav>
		<h1>Machine Intelligence Conference 2019</h1>
		<Registration></Registration>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav.vue'
import Registration from '@/components/Registration.vue'

export default {
	name: 'conference',

	components: {
		PageNav,
		Registration
	},

	data() {
		return {
		}
	}
}
</script>

<style>
</style>