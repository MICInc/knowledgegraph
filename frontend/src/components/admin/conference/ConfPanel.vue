<template>
	<div id="container" v-on:panel="show($event)">
		<h2>Conference Panel</h2>
		<div id="panel-nav" v-on:program_panels="update_panels($event)">
			<ul v-for="(panel, index) in panels">
				<button class="conf-button" v-on:click="show(panel.name)">{{ panel.name }}</button>
			</ul>
		</div>
		<div id="content">
			<Overview v-if="view == 'overview'"></Overview>
			<Applications v-if="view == 'applications'"></Applications>
		</div>
	</div>
</template>

<script>
import Overview from '@/components/admin/conference/Overview'
import Applications from '@/components/admin/conference/Applications'
import RegistrationService from '@/services/RegistrationService'

export default {
	name: 'ConfPanel',
	components: {
		Applications,
		Overview
	},
	data() {
		return {
			applications: [],
			panels: [
				{
					name: 'overview'
				},
				{
					name: 'applications'
				}
			],
			selected: false,
			view: 'overview'
		}
	},
	methods: {
		async getApplications() {
			return await RegistrationService.getRegistrations()
			.then(function(data) {
				return data.data;
			});
		},
		show(view) {
			this.view = view;
		}
	},
	beforeMount() {
		this.getApplications().then(data => {
			console.log(data);
			for(let k in data) {
				this.applications.push(data[k]);
			}
		});
	}
}
</script>

<style>
.conf-button {
	margin: 0px;
	border: 1px solid;
	padding: 32px 64px;
	font-size: 1em;
}

#panel-nav {
	float: left;
}

#content {
	float: left;
}
</style>