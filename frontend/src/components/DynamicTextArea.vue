<template>
	<div id="container">
		<div v-for="(value, index) in content">
			<textarea class="content" v-model="content[index].value" v-bind:ref="'content-'+index" v-on:mouseup="highlight" v-on:keyup="emit_content" v-on:keyup.enter="add_content(index)" placeholder="Content"></textarea>
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
		},
		highlight() {
			// source: https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
			var text = "";
			var activeEl = document.activeElement;
			var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
			var is_textarea = (activeElTagName == "textarea");
			var active_tag = (activeElTagName == "input" && /^(?:text|search|password|tel|url)$/i.test(activeEl.type));
			var is_number = (typeof activeEl.selectionStart == "number");

			if (is_textarea || active_tag && is_number) {
				text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
			} 
			else if (window.getSelection) {
				text = window.getSelection().toString();
			}

			return text;
		}
	}
}
</script>

<style>
.content {
	width: 100%;
	-o-transition:.5s;
	-ms-transition:.5s;
	-moz-transition:.5s;
	-webkit-transition:.5s;
	transition:.5s;
	min-height: 1em;
	overflow:hidden;
	margin: 5px;
}

.content:hover {
  box-shadow: 0 0 1px #E8E8E8;
}
</style>