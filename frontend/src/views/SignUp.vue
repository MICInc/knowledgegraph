<template>
	<div class="signup main">
		<PageNav></PageNav>
		<div class="container">
			<Join></Join>
			<button v-on:click.prevent="submit">Submit</button>
		</div>
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

<style scoped>

.main {
	display: flex;
	flex-direction: column;
}

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

button {
	margin-top: 5px;
	width: 300px;
}

</style>