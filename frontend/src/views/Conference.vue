<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="conference">
			<h1>Machine Intelligence Conference 2019</h1>
			<Registration v-if="form.registration" v-on:reveal="show_registration()"></Registration>
			<Feedback v-if="form.feedback" v-on:reveal="show_feedback()"></Feedback>
			<div v-if="!form.registration && !form.feedback" class="action-buttons">
				<router-link to="/login" tag="button">LOGIN</router-link>
				<button v-on:click.prevent="show_registration">REGISTER</button>
				<button v-on:click.prevent="show_feedback">FEEDBACK</button>
			</div>
		</div>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import Registration from '@/components/conference/Registration'
import Feedback from '@/components/conference/Feedback'
import Footer from '@/components/Footer'

export default {
	name: 'conference',

	components: {
		PageNav,
		Registration,
		Feedback,
		Footer
	},

	data() {
		return {
			form: {
				feedback: false,
				registration: false
			}
		}
	},
	methods: {
		show_feedback() {
			this.form.feedback = !this.form.feedback
		},
		show_registration() {
			this.form.registration = !this.form.registration;
		}
	}
}
</script>

<style scoped>
	
.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
}

button {
	background: #502984;
	color: #FFF;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 30%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	background: #331a54;
	color: #FFF;
}

</style>