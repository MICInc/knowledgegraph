<template>
	<div id="feedback-form">
		<h3>Help Us Democratize Machine Intelligence</h3>
		<p>Thanks for attending our 2019 Machine Intelligence Conference! Your feedback will help further our mission to democratize machine intelligence.</p>
		<div v-if="!form.complete">
			<form v-show="form.show">
				<label><b>Overall how was the conference?</b></label><br>
				<span v-for="(value, index) in form.overall">
					<input class="overall_button" v-model="feedback.overall" type="radio" name="overall" :value="value"/>
					<span class="overall_value">{{value}}</span>
				</span><br><br>
				<label><b>Which panels did you attend?</b></label><br>
				<span id="panels" v-for="(value, index) in form.panels">
					<input v-model="feedback.panels" type="checkbox" :name="value" :value="value"/> {{value}}<br>
				</span><br><br>
				<label><b>What did you like about the conference?</b></label><br>
				<textarea v-model="feedback.liked" placeholder="..."></textarea><br><br>
				<label><b>What changes could MIConf make to further democratize machine intelligence?</b></label><br>
				<textarea v-model="feedback.changes" placeholder="..."></textarea><br><br>
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
				overall: ['Bad', 'Fair', 'Good', 'Excellent', 'Loved it!'],
				panels: ['Machine Intelligence Community Alum Panel', 'MIT-IBM Women in Machine Intelligence Panel', 'Machine Intelligence Community, Inc. A Roadmap to Democratizing AI', 'AI & Climate Change: What Role Can Machine Learning Students, Engineers and Scientists Play in Leading the Transition Towards A Sustainable Future?', 'Machine Intelligence in Research and Industry'],
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
	/*diplay: block;*/
	vertical-align: middle;
}
</style>