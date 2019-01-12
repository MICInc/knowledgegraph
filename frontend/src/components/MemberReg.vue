<template>
	<div id="member-reg">
		<form id="community-reg-form">
			<label>Which community are you joining?</label>
			<select v-model.trim="profile.community">
				<option v-for='comm in form.communities'>{{ comm }}</option>
			</select>
			<label>Which community are you joining?</label>
			
		</form>
	</div>
</template>

<script>
// import service to retrieve list of schools

export default {
	name: 'member-reg',
	data() {
		return {
			form: {
				communities: ['MIT', 'Boston University', 'Harvard University']
			},
			profile: {
				community: ''
			}
		}
	},
	methods: {
	},
	mounted() {

	}
}
</script>

<style scoped>
</style>