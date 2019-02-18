<template>
	<div id="feedback-form">
		<h2>Feedback Form</h2>
		<div>
			Thanks for attending our 2019 Machine Intelligence Conference! Your feedback will help further our mission to democratize machine intelligence.
		</div>
		<form v-show="form.show">
			<button v-on:click.prevent="reveal_form()">Hide form</button><br>
			<label>How satisfied were you with the event?</label><br>
			<!-- <textarea v-model=""></textarea><br>
			<label>What were your key take aways from this event?</label><br>
			<textarea v-model=""></textarea><br>
			<label>How satisfied were you with the logistics?</label><br>
			<textarea v-model=""></textarea><br>
			<label>Additional feedback on logistics</label><br>
			<textarea v-model=""></textarea><br>
			<label>Which sessions did you find most interesting?</label><br>
			<textarea v-model=""></textarea><br>
			<label>How satisfied were you with the Women in Machine Intelligence (WiMI) panel?</label><br>
			<textarea v-model=""></textarea><br>
			<label>How satisfied were you with the Alumni panel?</label><br>
			<textarea v-model=""></textarea><br>
			<label>How satisfied were you with the Industry panel?</label><br>
			<textarea v-model=""></textarea><br>
			<label>Any overall feedback for the event?</label><br>
			<textarea v-model=""></textarea><br>
			<label>What would you like to see next year?</label><br>
			<textarea v-model=""></textarea><br>
			<label>Name (optional)</label><br>
			<textarea v-model=""></textarea><br> -->
			<button v-on:click.prevent="reveal_form()">Hide form</button><br>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				show: true
			}
		}
	},
	methods: {
		reveal_form() {
			this.$emit('reveal')
		}
	}
}
</script>

<style>
</style>