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
					list: ['Affiliation', 'Profile information', 'Profile image', 'Browser information', 'Session activity', 'Comments', 'Date joined', 'Date of birth', 'Email', 'Ethnicity', 'Your name', 'Users you follow', 'Users following you', 'Education', 'User-derived content', 'Research interests', 'Search history', 'View duration', 'IP address']
				},
				{
					header: 'How MIC uses your data', 
					info: 'The main goal of the MIC platform is to encourage community-driven content as a public good to further democratize machine intelligence knowledge. To do this, we need to understand user behavior - what research topics are you interested, what topics are generally well understood, what topics are growing the fastest? capturing these metrics allows us to improve the platform and user experience to further encourage our community to materialize knowledge space.',
					list: []
				},
				{
					header: 'Third Parties',
					info: 'MIC does not distribute any data to third parties.',
					list: []
				},
				{
					header: 'Tracking & Cookies',
					info: 'MIC does not track users or use cookies.',
					list: []
				},
				{
					header: 'Modifying or Deleting Personal Information',
					info: 'Users can delete their accounts and modify personal information.',
					list: []
				},
				{
					header: 'Changes to Policy',
					info: 'MIC periodically updates the Data Policy. Users will be notified about significant changes.',
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