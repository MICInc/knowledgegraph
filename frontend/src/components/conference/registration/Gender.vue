<template>
	<div>
		<label>Gender</label><br>
		<select :class="{ error: error }" name="gender" v-model="gender" @change="set_gender()">
			<option v-for="g in genders">{{ g }}</option>
		</select><br>
	</div>
</template>

<script>
export default {
	name: 'Gender',
	data () {
		return {
			gender: '',
			genders: ['Female', 'Male', 'Non-binary']
		}
	},
	methods: {
		set_gender() {
			this.$emit('gender', this.gender);
		}
	},
	props: ['error']
}
</script>

<style>
</style>