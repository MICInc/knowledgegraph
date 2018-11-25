<template>
	<div class="content">
		<PageNav></PageNav>
		<h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'content',
	components: {
		PageNav
	},

	data () { // explicitely list all properties here for two-way binding so can later implementing editing feature
		return {
			url: this.$route.params.id,
			user: {
				id: 0
			},
			profile: {}
		}
	},

	methods: {
		async getContent() {
			return await ProfileService.getProfile({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			});
		}
	},

	beforeMount() {
		this.getContent().then(data => {
			this.profile = data;
		});
	}
}
</script>

<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

</style>
