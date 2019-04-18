<template>
	<div class="container">
		<div class="modal-backdrop" @click="close()">
			<div class="modal" @click.stop>
				<div class="modal-body">
					<form class="form">
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
			</div>
		</div>
	</div>
</template>

<script>
import ContentService from '@/services/ContentService'

export default {
	name: 'modal',
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
		close() {
			this.$emit('close');
		},
		report() {
			ContentService.report({ url: this.url, me: this.me })
			.then((resp) => {

			})
			.catch((error) => {

			});
		}
	},
	props: []
}
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	width: 50%;
	background: #FFFFFF;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 15px;
	display: flex;
}

.modal-header {
	border-bottom: 1px solid #eeeeee;
	color: #4AAE9B;
	justify-content: space-between;
}

.modal-footer {
	border-top: 1px solid #eeeeee;
	justify-content: flex-end;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	border: none;
	font-size: 20px;
	padding: 20px;
	cursor: pointer;
	font-weight: bold;
	color: #4AAE9B;
	background: transparent;
}

.btn-green {
	color: white;
	background: #4AAE9B;
	border: 1px solid #4AAE9B;
	border-radius: 2px;
}

.form {
	margin: auto;
	width: 80%;
}

.instructions {
	
}

.details {
	margin: auto;
	height: auto;
	width: 100%;
	border: none;
	outline: none;
	resize: none;
	overflow: auto;
}
</style>