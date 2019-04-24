<template>
	<div class="container">
		<PageNav></PageNav>
		<h1>Data Policy</h1>
		<b><span class="dated">Effective date: March 31st, 2019</span></b>
		<div class="policies">
			<p>{{ intro }}</p>
			<div class="policy-items" v-for="(item, index) in policies">
				<h3>{{ item.header }}</h3>
				<p class="policy-info">{{ item.info }}</p>
				<ol v-if="item.list.length > 0">
					<li v-for="(point, i) in item.list">{{ point }}</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'

export default {
	name: 'Date',
	components: {
		PageNav
	},
	data() {
		return {
			intro: 'This policy details how Machine Intelligence Community collects, stores, uses, and manages your data.',
			policies: [
				{
					header: 'What MIC collects',
					info: 'We collect basic user demographic information so we can get a picture of who our users are, where they come from, what they know. All this information gives us a better idea of the impact we have towards our mission to democratize machine intelligence. Below is a list of things we need to know:',
					list: ['affiliation', 'bio', 'comments', 'date joined', 'date of birth', 'email', 'ethnicity', 'your name', 'users you follow', 'users following you', 'school grade', 'content published on our platform', 'school', 'research interests', 'search history', 'view duration']
				},
				{
					header: 'How MIC uses your data', 
					info: 'fdsfdsfdsfdsfdsfds',
					list: []
				},
				{
					header: 'Third Parties',
					info: 'fdsfdsfdsfdsfdsfds',
					list: []
				},
				{
					header: 'Tracking & Cookies',
					info: 'fdsfdsfdsfdsfdsfds',
					list: []
				},
				{
					header: 'Modifying or Deleting Personal Information',
					info: 'fdsfdsfdsfdsfdsfds',
					list: []
				},
				{
					header: 'Changes to Policy',
					info: 'fdsfdsfdsfdsfdsfds',
					list: []
				},
			]
		}
	}
}
</script>

<style scoped>
.policy-items {
	margin: auto;
	width: 1080px;
}
.policy-info {
	display: flex;
	margin: auto;
	width: 100%;
}

</style>