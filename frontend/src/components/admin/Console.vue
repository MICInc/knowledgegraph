<template>
	<div id="container">
		<div id="program-nav">
			<ul id="nav-bar">
				<li><button v-on:click="switch_panel('conference')">Conference</button></li>
				<li><button v-on:click="switch_panel('community')">Communities</button></li>
				<li><button v-on:click="switch_panel('content')">Content</button></li>
			</ul>
		</div>
		<div id="program-panel">
			<ConfPanel v-if="active == 'conference'"></ConfPanel>
			<CommPanel v-if="active == 'community'"></CommPanel>
			<ContentPanel v-if="active == 'content'"></ContentPanel>
		</div>
	</div>
</template>

<script>
import ConfPanel from '@/components/admin/conference/ConfPanel';
import CommPanel from '@/components/admin/conference/CommPanel';
import ContentPanel from '@/components/admin/conference/ContentPanel';

export default {
	name: 'Console',
	components: {
		ConfPanel,
		CommPanel,
		ContentPanel
	},
	data() {
		return {
			active: '',
			panels: []
		}
	},
	methods: {
		switch_panel(panel) {
			this.active = panel;
		},
		update_panels(panels) {
			this.panels = panels;
		}
	}
}
</script>

<style scoped>

#program-nav {
	margin: auto;
	width: 50%;
}

#nav-bar {
	margin: auto;
	width: 50%;
}

#nav-bar li {
	display: inline;
}

</style>