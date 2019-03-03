<template>
	<div class="content">
		<PageNav></PageNav>
		<h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
		<h3>Citations</h3>
		<span>{{ profile.citations }}</span>
		<h3>Library</h3>
		<button v-on:click="clear_library()">clear</button>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'content',
	beforeMount() {
		this.getContent().then(data => {
			this.profile = data;
		});
		
		this.user_id = this.$store.state.userInfo.id;
	},
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
		async clear_library() {
			ProfileService.clearLibrary({ user_id: this.user_id })
			.then(function(data) {
				console.log(data);
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		async getContent() {
			return await ProfileService.getProfile({ params: { url: this.url } })
			.then(function(data) {
				return data.data[0];
			})
			.catch(function(err) {
				console.log(err);
			});
		}
	}
}
</script>

<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

</style>
