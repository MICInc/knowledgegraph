<template>
	<div class="community main">
		<PageNav></PageNav>
		<div class="container">
			<h1>Community Page</h1>
			<CommunityReg></CommunityReg>
		</div>
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

<style scoped>
	
.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
}

</style>
