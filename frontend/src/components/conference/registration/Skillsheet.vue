<template>
	<div v-on:keyup="update()">
		<label>Opt-in to <a href="https://www.dropbox.com/request/UEtnUpmQ5AHMOw8PmrvN" target="_blank">share</a> your skill sheet with sponsors</label><br>
		<input :class="{ error: error }" type="text" placeholder="LinkedIn (optional)" v-model.trim="social.linkedin"><br>
		<input :class="{ error: error }" type="text" placeholder="Github (optional)" v-model.trim="social.github">
	</div>
</template>

<script>
export default {
	name: 'Skillsheet',
	data () {
		return {
			social: {
				linkedin: '',
				github: ''
			}
		}
	},
	methods: {
		update(event) {
			this.$emit('skills', this.social);
		}
	}
}
</script>

<style>
</style>