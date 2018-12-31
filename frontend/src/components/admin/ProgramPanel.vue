<template>
	<div id="container">
		<div id="program-nav">
			<ul id="nav-bar" v-for="(program, index) in programs">
				<li><button v-on:click="switch_panel(program.name)" v-bind:src="program.src">{{ program.name }}</button></li>
			</ul>
		</div>
		<div v-on:program_panels="update_panels($event)">
			<ul v-for="(panel, index) in panels">
				<li><a v-bind:src="panel.src">{{ panel.name }}</a></li>
			</ul>
		</div>
		<div id="program-panel">
			<ConfPanel v-if="activate == 'conference'" v-bind:activate="activate == 'conference'"></ConfPanel>
		</div>
	</div>
</template>

<script>
import ConfPanel from './conference/ConfPanel';

export default {
	name: 'ProgramPanel',
	components: {
		ConfPanel
	},
	data() {
		return {
			activate: 'conference',
			panels: [],
			programs: [
				{
					name: 'content',
					src: '#content'
				},
				{
					name: 'communities',
					src: '#communities'
				},
				{
					name: 'conference',
					src: '#conference'
				}
			]
		}
	},
	method: {
		switch_panel(panel) {
			this.activate = panel;
		},
		update_panels(panels) {
			this.panels = panels;
		}
	}
}
</script>

<style scoped>
#nav-bar li {
	display: inline;
}
</style>