<template>
	<div id="container" class="main">
		<PageNav></PageNav>
		<h2>Admin console</h2>
		<Console></Console>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import Console from '@/components/admin/Console';

export default {
	name: 'admin-console',
	components: {
		PageNav,
		Console
	},
	data() {
		return {

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

</style>