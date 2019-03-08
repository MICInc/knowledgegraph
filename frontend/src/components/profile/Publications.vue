<template>
	<div class="container">
		<h2>PUBLICATIONS</h2>
	</div>
</template>

<script>
import router from '@/router'
import ProfileService from '@/services/ProfileService'

export default {
	name: 'Publications',
	created() {

	},
	data() {
		return {

		}
	},
	methods: {
		async getLibrary() {
			ProfileService.getLibrary().then({

			});
		}	
	}
}
</script>

<style>
</style>