<template>
	<div class="signup main">
		<div class="container">
			<PageNav></PageNav>
			<Join></Join>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import Join from '@/components/Join'

export default {
	name: 'signup',
	components: {
		Join,
		PageNav
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