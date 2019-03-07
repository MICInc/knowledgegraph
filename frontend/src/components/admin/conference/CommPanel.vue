<template>
	<div class="container" v-on:panel="show($event)">
		<div v-on:program_panels="update_panels($event)">
			<ul v-for="(panel, index) in panels">
				<button v-on:click="show(panel.name)">{{ panel.name }}</button>
			</ul>
		</div>
		<div>
			<Overview v-if="view == 'overview'"></Overview>
		</div>
	</div>
</template>

<script>
import Overview from '@/components/admin/conference/Overview';
export default {
	name: 'CommPanel',
	components: {
		Overview
	},
	data() {
		return {
			panels: [
				{
					name: 'overview',
				}
			],
			selected: false,
			view: ''
		}
	},
	methods: {
		show(view) {
			this.view = view;
		}
	}
}
</script>

<style>
</style>