<template>
	<div>
		<label>How did you hear about our conference?</label><br>
		<textarea v-model.trim="questions.q1"></textarea><br>
		<label>What future do you see for machine intelligence that others don't? (max 200 characters)</label><br>
		<textarea v-model.trim="questions.q2" maxlength="200"></textarea><br>
		<label>What do you want out of this conference and anything else we should know? (max. 200 characters)</label><br>
		<textarea v-model.trim="questions.q3" maxlength="200"></textarea><br>
	</div>
</template>

<script>
export default {
	name: 'Questionaire',
	components: {
	},
	data () {
		return {
			questions: {
				q1: '',
				q2: '',
				q3: ''
			}
		}
	},
	watch: {
		questions: function(curr, prev) {
			this.$emit('resp', this.questions);
		}
	}
}
</script>

<style scoped>
</style>