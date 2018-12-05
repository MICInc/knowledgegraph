<template>
	<div class="community">
		<PageNav></PageNav>
		<h1>Community Page</h1>
		<CommunityReg></CommunityReg>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav.vue'
import CommunityReg from '@/components/CommunityReg.vue'

export default {
	name: 'community',
	components: {
		PageNav,
		CommunityReg
	},

	data() {
		return {
		}
	}
}
</script>