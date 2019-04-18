<template>
	<div class="container">
		<form>
			<input type="text" :placeholder="me.first_name">
			<input type="text" :placeholder="me.last_name">
			<label>Describe the abuse:</label>
			<textarea></textarea>
			<button v-on:click.prevent="">Submit</button>
		</form>
	</div>
</template>

<script>
import ContentService from '@/services/ContentService'
export default {
	data() {
		return {
			url: this.$route.query.page
			me: this.$store.state.userInfo
		}
	},
	methods: {
		report() {
			ContentService.report({ url: this.url, me: this.me })
			.then((resp) => {

			})
			.catch((error) => {

			});
		}
	}
}
</script>

<style scoped>
</style>