<template>
	<div class="community main">
		<PageNav></PageNav>
		<div class="container">
			<h1>Community Page</h1>
			<a href="/community/start">Start a community</a>
		</div>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import MemberReg from '@/components/MemberReg'

export default {
	name: 'community',
	components: {
		PageNav,
		MemberReg
	},

	data() {
		return {
			form: {
				reveal: ''
			}
		}
	},
	methods: {
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
	width: 1080px;
}

</style>
