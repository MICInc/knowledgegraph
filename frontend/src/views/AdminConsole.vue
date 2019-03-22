<template>
	<div class="container">
		<PageNav></PageNav>
		<Console v-if="accessible" id="console"></Console>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav';
import Console from '@/components/admin/Console';
import AdminService from '@/services/AdminService'

export default {
	name: 'admin-console',
	components: {
		PageNav,
		Console
	},
	created() {
		AdminService.verify_access_level({ email: this.$store.state.userInfo.email, token: this.$store.state.accessToken })
		.then((resp) => {
			if(resp.data.status) this.accessible = true;
		})
		.catch((error) => {
			this.$router.push('/login');
		});
	},
	data() {
		return {
			accessible: false
		}
	}
}
</script>

<style scoped>
#console {
	margin-top: 10px;
}
</style>