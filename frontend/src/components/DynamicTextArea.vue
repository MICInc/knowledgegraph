<template>
	<div id="container">
		<div v-for="(value, index) in content">
			<textarea v-model="content[index].value" v-bind:ref="'content-'+index" v-on:keyup="emit_content" v-on:keyup.enter="add_content(index)" placeholder="Content"></textarea>
		</div>
	</div>
</template>

<script>
export default { 
	data() {
		return {
			content: [{
				date: new Date(),
				last_modified: new Date(),
				tags: "",
				value: "",
			}]
		}
	},
	methods: {
		add_content(index) {
			var next = index + 1;
			this.content.splice(next, 0, {
				date: new Date(),
				last_modified: new Date(),
				tags: "",
				value: "",
			});
			this.$nextTick(() => {
				this.$refs['content-'+next][0].focus()
			});
		},
		emit_content() {
			this.$emit('content', this.content);
		}
	}
}
</script>

<style>
.dynamic_field {

}
</style>