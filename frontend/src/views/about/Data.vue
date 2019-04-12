<template>
	<div class="container">
		<PageNav></PageNav>
		<h1>Data Policy</h1>
		<ol class="term-info">
			<li v-for="(value, index) in terms">
				<span class="terms-sect-header">{{ value.title }}</span>
				<p>{{ value.desc }}</p>
			</li>
		</ol>
		<span class="dated">DATED: March 31st, 2019</span>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'

export default {
	name: 'Date',
	components: {
		PageNav
	},
	data() {
		return {
			policy: [
				{

				}
			]
		}
	}
}
</script>

<style scoped>
</style>