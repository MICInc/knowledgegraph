<template>
	<div id="container" v-on:panel="show($event)">
		<div id="panel-nav" v-on:program_panels="update_panels($event)">
			<ul v-for="(panel, index) in panels">
				<button class="conf-button" v-on:click="show(panel.name)" v-bind:class="{display_button: display==panel.name}">{{ panel.name }}</button>
			</ul>
		</div>
		<div id="content">
			<Overview v-if="view == 'overview'"></Overview>
			<Applications v-if="view == 'applications'" v-bind:applications="applications"></Applications>
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
	created() {
		this.getRegistrations().then((data) => {
			this.application = data;
		});
	},
	data() {
		return {
			applications: [],
			display: '',
			panels: [
				{
					name: 'overview'
				},
				{
					name: 'applications'
				},
				{
					name: 'reimbursements'
				}
			],
			selected: false,
			view: 'overview'
		}
	},
	methods: {
		async getRegistrations() {
			return await RegistrationService.getRegistrations()
			.then(function(data) {
				console.log(data.data);
				return data.data;
			});
		},
		show(view) {
			this.view = view;
			this.display = view;
		}
	},
}
</script>

<style>
.display_button {
	font-weight: bold;
}

.conf-button {
	margin: 0px;
	padding: 32px 64px;
	width: 180px;
	font-size: 1em;
}

#panel-nav {
	background-color: black;
	float: left;
}

#content {
	width: calc(100% - 180px);
	float: right;
}
</style>