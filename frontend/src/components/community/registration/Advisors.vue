<template>
	<div class="form-sect">
		<label class="section-heading">IV. Does your organaization have advisors?</label>
		<div class="advisor-field" v-for="(value, index) in advisors" v-on:keyup="update()" v-on:keydown.enter="add_advisor(index)">
			<input type="text" placeholder="First name" v-model.trim="advisors[index].first_name">
			<input type="text" placeholder="Last name" v-model.trim="advisors[index].last_name">
			<input type="text" placeholder="Email" v-model.trim="advisors[index].email">
		</div>
	</div>
</template>

<script>
export default {
	name: 'advisors',
	data() {
		return {
			advisors: [{}]
		}
	},
	methods: {
		add_advisor(index) {
			this.advisors.splice(index + 1, 0, {});
		},
		remove_advisor(index) {
			if(this.advisors.length <= 1) this.advisors[index] = {};
			else this.advisors.splice(index, 1);
		},
		update() {
			this.$emit('update', { advisors: this.advisors });
		}
	}
}
</script> 

<style>
</style>