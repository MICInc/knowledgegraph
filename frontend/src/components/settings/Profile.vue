<template>
	<div class="container">
		<h3>Profile</h3>
		<form autocomplete="off">
			<input v-model="url" type="text" placeholder="Username"><br>
			<span class="field-desc">https://machineintelligence.cc/{{ url }}</span><br>
			<input v-model="first_name" type="text" placeholder="First name"><br>
			<input v-model="last_name" type="text" placeholder="Last name"><br>
			<input v-model="email" type="text" placeholder="Email"><br>
			<span class="field-desc">Email will not be publicly displayed.</span><br>
			<button type="submit" v-on:click.prevent="update()">Save</button>
		</form>
	</div>
</template>

<script>
import router from '@/router'

export default {
	name: 'password',
	data() {
		return {
			url: '',
			first_name: '',
			last_name: '',
			email: ''
		}
	},
	methods: {
		update() {
			if(this.url.length > 0) this.update_url();
			if(this.first_name.length > 0) this.update_first_name();
			if(this.last_name.length > 0) this.update_last_name();
			if(this.email.length > 0) this.update_email();
		},
		update_url() {
			this.$emit('url', { url: this.url });
		},
		update_first_name() {
			this.$emit('first_name', { first_name: this.first_name });
		},
		update_last_name() {
			this.$emit('last_name', { last_name: this.last_name });
		},
		update_email() {
			this.$emit('email', { email: this.email });
		}
	}
}
</script>

<style scoped>
input {
	border: 0;
}

.field-desc {
	font-size: 0.7em;
}

button {
	height: 25px;
	width: 25%;
	font-size: 0.8em;
}
</style>