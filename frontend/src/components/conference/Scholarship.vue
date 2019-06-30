<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>MIC Gender Diversity Scholarship</h3>
		<p>Promote diversity in the field of machine intelligence and democratize educational content with our gender and ethnic diversity scholarships.</p>
		<span><b>Submission deadline</b>: July 31, 2019 11:59 PM EST</span>
		<label>General Requirements</label>
		<ul>
			<li v-for="(r, i) in reqs">{{ i+1 }}. {{ r }}</li>
		</ul>
		<div>
			<h4>Application</h4>
			<form>
				<input type="text" placeholder="First name" required><br>
				<input type="text" placeholder="Last name" required><br>
				<input type="text" placeholder="Date of birth" required><br>
				<input type="text" placeholder="Date of birth" required>
			</form>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
export default {
	components: {
		PageNav
	},
	data() {
		return {
			reqs: [
				'Applying for this scholarship will also apply you for the conference even if you are not selected for this scholarship.',
				'You must be at least 18 years old to apply.',
				'Must be from an underrerepresented group.'
			]
		}
	}
}
</script>

<style>
</style>