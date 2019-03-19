<template>
	<div class='form-sect'>
		<label class="section-heading">I.  Where will MIC's next community be?</label>
		<SchoolField 
			:error="error"
			v-on:school="update($event)">
		</SchoolField>
	</div>
</template>

<script>
import SchoolField from '@/components/form/SchoolField'
export default {
	components: {
		SchoolField
	},
	methods: {
		update(school) {
			this.$emit('update', { school: school });
		}
	},
	props: ['error']
}
</script> 

<style>
</style>