<template>
	<div class="conference main">
		<PageNav></PageNav>
		<div class="container">
			<h1>Machine Intelligence Conference 2019</h1>
			<Registration v-if="form.show" v-on:reveal="reveal()"></Registration>
			<div v-if="!form.show" class="action-buttons">
				<router-link to="/login" tag="button">Login</router-link>
				<button v-on:click.prevent="reveal">Register</button>
				<button v-on:click.prevent="reveal">Feedback</button>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import Registration from '@/components/Registration'
import Footer from '@/components/Footer'

export default {
	name: 'conference',

	components: {
		PageNav,
		Registration,
		Footer
	},

	data() {
		return {
			form: {
				show: false
			}
		}
	},
	methods: {
		reveal() {
			this.form.show = !this.form.show;
		},
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