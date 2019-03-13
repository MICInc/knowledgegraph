<template>
	<div class='form-sect'>
		<label class="expand-section">III. Who are your executives?</label>
		<div v-for="(value, index) in execs">
			<div :class="{ error: error }" class="name">
				<div v-on:keyup.enter="add_exec(index)">
					<input 
						:ref="'exec_position'+index" 
						type="text" 
						placeholder="Position" 
						v-model.trim="execs[index].position">
					<input 
						:ref="'exec_first_name'+index" 
						type="text" 
						placeholder="First name" 
						v-model.trim="execs[index].first_name">
					<input 
						:ref="'exec_last_name'+index" 
						type="text" 
						placeholder="Last name" 
						v-model.trim="execs[index].last_name">
					<input 
						:ref="'exec_email'+index" 
						type="text"
						placeholder="Email" 
						v-model.trim="execs[index].email">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'executives',
	data() {
		return {
			execs: [{
				position: '',
				first_name: '',
				last_name: '',
				email: ''
			}]
		}
	},
	methods: {
		add_exec(index) {
			this.execs.splice(index + 1, 0, {});
		}
	},
	props: ['error']
}
</script> 

<style>
</style>