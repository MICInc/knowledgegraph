<template>
	<div class="conference">
		<PageNav></PageNav>
		<h1>Conference Page</h1>
		<SignUp></SignUp>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav.vue'
import SignUp from '@/components/SignUp.vue'

export default {
	name: 'conference',
	components: {
		PageNav,
		SignUp
	},

	data() {
		return {
		}
	}
}
</script>