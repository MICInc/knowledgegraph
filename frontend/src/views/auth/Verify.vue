<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>Verify</h3>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import AuthenticationService from '@/services/AuthenticationService'

export default {
	name: 'verify',
	components: {
		PageNav
	},
	beforeMount() {
		this.verify();
	},
	methods: {
		async verify() {			
			AuthenticationService.verify({ code: this.$route.query.c })
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}
}
</script>

<style scoped>
</style>