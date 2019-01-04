<template>
	<div class="signup main">
		<PageNav></PageNav>
		<div class="container">
			<Join></Join>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import Join from '@/components/Join'

export default {
	name: 'signup',
	components: {
		PageNav,
		Join
	}
}
</script>

<style scoped>

.main {
	display: flex;
	flex-direction: column;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

button {
	margin-top: 5px;
	width: 300px;
}

</style>