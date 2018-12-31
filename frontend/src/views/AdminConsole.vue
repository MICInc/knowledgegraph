<template>
	<div id="container" class="main">
		<PageNav></PageNav>
		<h2>Admin console</h2>
		<ProgramPanel></ProgramPanel>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import ProgramPanel from '@/components/admin/ProgramPanel';

export default {
	name: 'admin-console',
	components: {
		PageNav,
		ProgramPanel
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