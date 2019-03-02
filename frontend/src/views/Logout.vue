<template>
  <div class="logout">
  </div>
</template>

<script>

import AuthService from '@/services/AuthenticationService'
import router from '@/router'

export default {
	name: 'logout',
	beforeMount(){
		AuthService.logoutUser(this.$store.state.userInfo);
		this.$store.dispatch('logout').then((response) => {
			router.push({ name: 'home' })
		}).catch((err) => {
			router.push({ name: 'home' })
		})
	},
}
</script>