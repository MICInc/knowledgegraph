<template>
	<div id="feedback-form">
		<div v-if="!form.complete">
			<form v-show="form.show">
				<button v-on:click.prevent="reveal_form()">Hide form</button><br>
				<div class="top-message">
					Thanks for attending our 2019 Machine Intelligence Conference! Your feedback will help further our mission to democratize machine intelligence.
				</div>
				<label>Overall how was the event?</label><br>
				<span v-for="(value, index) in form.overall">
					<input class="overall_button" v-model="feedback.overall" type="radio" name="overall" :value="value"/>
					<span class="overall_value">{{value}}</span>
				</span><br>
				<label>Which panels did you attend?</label><br>
				<span id="panels" v-for="(value, index) in form.panels">
					<input v-model="feedback.panels" type="checkbox" :name="value" :value="value"/> {{value}}
				</span><br>
				<label>What did you like about the conference?</label><br>
				<textarea v-model="feedback.liked"></textarea><br>
				<label>What changes could MIConf make to further democratize machine intelligence?</label><br>
				<textarea v-model="feedback.changes"></textarea><br>
				<Disclaimer></Disclaimer>
				<button v-on:click.prevent="submit">Submit</button>
			</form>
		</div>
		<div v-if="form.complete">
			Thank you for you feedback!
		</div>
	</div>
</template>

<script>
import FeedbackService from '@/services/FeedbackService';
import Disclaimer from '@/components/form/Disclaimer';

export default {
	components: {
		Disclaimer
	},
	data() {
		return {
			form: {
				complete: false,
				overall: ['0', 'Fair', 'Good', 'Excellent', '100'],
				panels: ['Alumni', 'Gender Variance', 'Ethnic variance'],
				show: true
			},
			feedback: {
				changes: '',
				liked: '',
				overall: '',
				panels: []
			}
		}
	},
	methods: {
		reveal_form() {
			this.$emit('reveal')
		},
		submit() {
			this.form.complete = true;
			
			FeedbackService.send(this.feedback).then((data) => {
				console.log(data);
			});
		}
	}
}
</script>

<style scoped>
textarea {
	width: calc(600px - 10px);
	min-height: 75px;
	border: transparent;
}

.overall_button {
	margin-right: 5px;
}

.overall_value {
	margin-right: 1em;
}

#panels {
	diplay: block;
}
</style>