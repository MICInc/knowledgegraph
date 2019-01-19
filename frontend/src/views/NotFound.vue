<template>
	<div id="container">
		<PageNav></PageNav>
		<NotFoundMsg></NotFoundMsg>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import NotFoundMsg from '@/components/NotFoundMsg'

export default {
	name: 'notfound',
	components: {
		PageNav,
		NotFoundMsg
	}
}
</script>

<style scoped>
</style>

