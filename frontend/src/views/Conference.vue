<template>
	<div class="conference main">
		<PageNav></PageNav>
		<div class="container">
			<h1>Machine Intelligence Conference 2019</h1>
			<Registration v-if="form.registration" v-on:reveal="show_registration()"></Registration>
			<Feedback v-if="form.feedback" v-on:reveal="show_feedback()"></Feedback>
			<div v-if="!form.registration && !form.feedback" class="action-buttons">
				<router-link to="/login" tag="button">Login</router-link>
				<button v-on:click.prevent="show_registration">Register</button>
				<button v-on:click.prevent="show_feedback">Feedback</button>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import Registration from '@/components/Registration'
import Feedback from '@/components/Feedback'
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

<style>
	
.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
}

</style>