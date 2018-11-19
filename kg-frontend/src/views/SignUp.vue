<template>
	<div class="signup">
		<PageNav></PageNav>
		<form v-on:submit.prevent="handleSubmit">
			<div class="input-row">
				<input type="text" placeholder="First Name" v-model="formData.first_name" required>
				<input type="text" placeholder="Last Name" v-model="formData.last_name" required>
			</div>
			<input type="email" placeholder="Email" v-model="formData.email" required>
			<input type="password" placeholder="Password" v-model="formData.password" required>
			<input type="password" placeholder="Comfirm Password" v-model="formData.comfirm_password" required>
		</form>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedArticle from '@/components/LinkedArticle.vue'

export default {
	name: 'home',
	components: {
		PageNav,
	},

	data () {
		return {
			formData: {}
		}
	},

	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		}
	}
}
</script>


<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

</style>
