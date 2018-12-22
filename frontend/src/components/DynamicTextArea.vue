<template>
	<div id="container" v-on:keyup="save($event)" v-on:click="save($event)">
		<div id="editbar">
			<!-- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand -->
			<button class="toolbar" v-on:click.prevent="stylize('bold')">Bold</button>
			<button class="toolbar" v-on:click.prevent="stylize('italic')">Italics</button>
			<button class="toolbar" v-on:click.prevent="stylize('underline')">Underline</button>
			<button class="toolbar" v-on:click.prevent="stylize('createLink')">Link</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertOrderedList')">Bullet</button>
			<button class="toolbar" v-on:click.prevent="stylize('insertImage')">Image</button>
		</div>
		<div v-for="(value, index) in content">
			<p v-bind:id="'content-'+index" class="content" v-model="content[index].value" v-bind:ref="'content-'+index" v-on:keydown.enter="prevent_nl($event)" v-on:keyup="emit_content($event)" v-on:keyup.enter="add_content(index)" v-on:keyup.delete="remove_content(index)" contenteditable></p>
		</div>
	</div>
</template>

<script>
export default { 
	data() {
		return {
			data: {},
			content: [{
				date: new Date(),
				last_modified: new Date(),
				tags: "",
				value: "",
			}],
			highlighted: undefined
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
		emit_content(event) {
			this.$emit('content', this.data);
		},
		prevent_nl(event) {
			event.preventDefault();
		},
		remove_content(index) {
			var prev = index - 1;
			this.content.shift();
			this.$nextTick(() => {
				this.$refs['content-'+prev][0].focus()
			});
		},
		save(event) {
			var el = event.target;
			var id = el.getAttribute('id');
			if(id != null && el.nodename != 'INPUT' && el.nodename != 'TEXTAREA') {

				if(this.data[id] != undefined) {
					this.data[id].value = el.innerHTML;
				}
				else {
					this.data[id] = {date: new Date(), last_modified: new Date(), tags:'', value: ''}
				}

				// console.log(JSON.stringify(this.data));
			}
		},
		stylize(style) {
			document.execCommand(style, false, null);
			console.log(this.content[0].value);
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
	min-height: 5em;
	overflow:hidden;
	margin: 5 0px;
}

.content:hover {
  box-shadow: 0 0 1px #E8E8E8;
}
</style>