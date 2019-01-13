<template>
  <div class="logout">
  </div>
</template>

<script>

import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'logout',

	methods: {
		async logout () {
			return await AuthService.logoutUser()
		}
	},

	beforeMount(){
		this.$store.dispatch('logout').then((response) => {
			router.push({ name: 'home' })
		}).catch((err) => {
			router.push({ name: 'home' })
		})
	},
}
</script>