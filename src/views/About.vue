<template>
	<div class="about">
		<PageNav></PageNav>
		<h1>Mission statement</h1>
		<p>{{ mission.statement }}</p>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav.vue'

export default {
	name: 'about',
	components: {
		PageNav,
	},

	data() {
		return {
			mission: {
				statement: 'The Machine Intelligence Community (MIC) is a non-profit organization which aims to democratize machine intelligence education, access, and contribution through college communities. Our central goals are to provide opportunities for students to learn about machine intelligence in a community environment, connect students with academic mentors, resources, and industry practitioners, and to foster the future leaders in machine intelligence.'
			}
		}
	}
}
</script>