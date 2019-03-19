<template>
	<div class="container">
		<PageNav></PageNav>
		<Console id="console"></Console>
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
#console {
	margin-top: 10px;
}
</style>