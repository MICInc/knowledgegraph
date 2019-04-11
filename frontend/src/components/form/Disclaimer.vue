<template>
	<div class="disclaimer">
		By clicking Submit, you agree to our <a :href="terms">Terms</a>, <a :href="data">Data Policy</a> and <a :href="cookies">Cookies Policy</a>.
	</div>
</template>

<script>
export default {
	name:'disclaimer',
	data() {
		return {
			terms: '/about/terms',
			data: '/about/data',
			cookies: '/about/cookies'
		}
	}
}
</script>

<style scoped>
.disclaimer {
	font-size: 12px;
}
</style>