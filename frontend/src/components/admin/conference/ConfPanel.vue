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
	data() {
		return {
			applications: [
				{first_name: 'Justin', last_name: 'Chen', dob_year: 2000, dob_month: 20, dob_day: 20, affiliation: 'MIC', school: 'Boston University', grade: 'Not in school', gender: 'male', ethnicity: 'asian', reason: 'Dope conference bro', travel: 1000000, appleappleappleappleapple: 'appleappleappleappleapple'},
				{first_name: 'Daelon', last_name: 'Austin', dob_year: 2000, dob_month: 20, dob_day: 20, affiliation: 'MIC', school: 'Boston University', grade: 'Not in school', gender: 'male', ethnicity: 'asian', reason: 'Dope conference bro', travel: 1000000, appleappleappleappleapple: 'appleappleappleappleapple'},
				{first_name: 'Daelon', last_name: 'Austin', dob_year: 2000, dob_month: 20, dob_day: 20, affiliation: 'MIC', school: 'Boston University', grade: 'Not in school', gender: 'male', ethnicity: 'asian', reason: 'Dope conference bro', travel: 1000000, appleappleappleappleapple: 'appleappleappleappleapple'}
			],
			display: '',
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
		// async getApplications() {
		// 	return await RegistrationService.getRegistrations()
		// 	.then(function(data) {
		// 		return data.data;
		// 	});
		// },
		show(view) {
			this.view = view;
			this.display = view;
		}
	},
	beforeMount() {
		// this.getApplications().then(data => {
		// 	console.log(data);
		// 	for(let k in data) {
		// 		this.applications.push(data[k]);
		// 	}
		// });
	}
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