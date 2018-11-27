<template>
	<div id="signup">
		<PageNav></PageNav>
		<Join></Join>
		<button v-on:click.prevent="submit">Submit</button>
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
	},
	methods: {
		submit() {
			ProfileService.createProfile(this.profile)
			.then(function(data){
				alert(data);
			});
		}
	}
}
</script>

<style>
</style>