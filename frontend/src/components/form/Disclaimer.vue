<template>
	<div class="disclaimer">
		By clicking Submit, you agree to Machine Intelligence Community's <a :href="terms">Terms</a> and <a :href="data">Data Policy</a>.
	</div>
</template>

<script>
export default {
	name:'disclaimer',
	data() {
		return {
			terms: '/about/terms',
			data: '/about/data',
		}
	}
}
</script>

<style scoped>
.disclaimer {
	font-size: 12px;
}
</style>