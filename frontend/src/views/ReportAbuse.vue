<template>
	<div class="container">
		<PageNav></PageNav>
		<form>
			<p class="instructions">Thank you, {{me.first_name}} {{me.last_name}} for reporting this content. The Machine Intelligence Community appreciates your diligence. Please let us know the nature of this content and we will address it immediately.</p>
			<input type="radio" name="copyright" :value="true" v-model="type.copyright"> Copyright Infringement<br>
			<input type="radio" name="disinfo" :value="true" v-model="type.disinformation"> Disinformation<br>
			<input type="radio" name="hate" :value="true" v-model="type.hate"> Hate Speech<br>
			<input type="radio" name="offtopic" :value="true" v-model="type.offtopic"> Off Topic<br>
			<input type="radio" name="spam" :value="true" v-model="type.spam"> Spam<br>
			<input class="details" autofocus wrap="off" :placeholder="placeholder" v-model="details"><br>
			<button v-on:click.prevent="report()">Submit</button>
		</form>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
import ContentService from '@/services/ContentService'

export default {
	beforeMount() {
	},
	components: {
		PageNav
	},
	data() {
		return {
			url: this.$route.query.page,
			me: this.$store.state.userInfo,
			details: '',
			placeholder: 'Describe the nature of the content',
			type: {
				copyright: false,
				disinformation: false,
				hate: false,
				offtopic: false,
				spam: false
			}
		}
	},
	methods: {
		report() {
			ContentService.report({ url: this.url, me: this.me })
			.then((resp) => {

			})
			.catch((error) => {

			});
		}
	}
}
</script>

<style scoped>
.instructions {
	width: 1080px;
}

.details {
	height: auto;
	width: 100%;
	border: none;
	outline: none;
	resize: none;
	overflow: auto;
}
</style>