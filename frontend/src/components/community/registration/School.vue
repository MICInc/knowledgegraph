<template>
	<div class='form-sect'>
		<label class="expand-section">I.  Where will MIC's next community be?</label>
		<SchoolTypeAhead :error="error"></SchoolTypeAhead>
	</div>
</template>

<script>
import SchoolTypeAhead from '@/components/SchoolTypeAhead'
export default {
	components: {
		SchoolTypeAhead
	},
	data() {
		return {
			
		}
	},
	props: ['error']
}
</script> 

<style>
</style>