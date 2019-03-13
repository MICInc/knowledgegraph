<template>
	<div class='form-sect'>
		<label class="section-heading">I.  Where will MIC's next community be?</label>
		<SchoolField 
			:error="error"
			v-on:school="set($event)">
		</SchoolField>
	</div>
</template>

<script>
import SchoolField from '@/components/form/SchoolField'
export default {
	components: {
		SchoolField
	},
	data() {
		return {
		}
	},
	methods: {
		set(name) {
			this.$emit('school', name);
			console.log('here');
		}
	},
	props: ['error']
}
</script> 

<style>
</style>