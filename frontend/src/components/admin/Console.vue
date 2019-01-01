<template>
	<div id="container">
		<div id="program-nav">
			<ul id="nav-bar" v-for="(program, index) in programs">
				<li><button v-on:click="switch_panel(program.name)">{{ program.name }}</button></li>
			</ul>
		</div>
		<div id="program-panel">
			<ConfPanel v-if="active == 'conference'"></ConfPanel>
			<CommPanel v-if="active == 'community'"></CommPanel>
			<ContentPanel v-if="active == 'content'"></ContentPanel>
			<!-- <CommunityPanel v-if="activate == 1"></CommunityPanel>
			<ContentPanel v-if="activate == 2"></ContentPanel> -->
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
			panels: [],
			programs: [
				{
					name: 'content',
				},
				{
					name: 'community',
				},
				{
					name: 'conference',
				}
			]
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
#nav-bar li {
	display: inline;
}
</style>