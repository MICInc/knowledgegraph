<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>IBM Diversity Scholarship 2019</h3>
		<p>The goal of our scholarship is to promote diversity in the field of machine intelligence and democratize educational content with our gender and ethnic diversity scholarships. If you already have an account, please login.</p>

		<h3>Timeline</h3>
		<table>
			<col width="300">
			<col width="300">
			<tr v-for="t in  timeline">
				<td>{{ t.event }}</td>
				<td>{{ t.date }}</td>
			</tr>
		</table>
		<h3>General Requirements</h3>
		<h3>Diversity in Machine Intelligence</h3>
		<p><a href="https://www.nsf.gov/statistics/2017/nsf17310/digest/introduction/"></a></p>
		<h3>Help Us Materialize Knowledge</h3>
		<p>Develop an educational article on a topic of your choice</p>
		<ul>
			<li v-for="req in basics">{{ req }}</li>
		</ul>
		<ul>
			<li v-for="req in criteria"><b>{{ req.item }}</b> {{ req.desc }}</li>
		</ul>
		<h3>Who should apply?</h3>
		<ul>
			<li v-for="req in who">{{ req }}</li>
		</ul>
		<h3>Eligibility</h3>
		<h3>Questions</h3>
		<p>Email us at <a class="conf-email" href = "mailto: conference@machineintelligence.cc">conference@machineintelligence.cc</a></p>
		<p><a class="apply" href="/conference/register">APPLY HERE</a></p>
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
			basics: [
				'All images, diagrams, graphics, quotes, papers, resources and facts must be cited.',
				'All content submitted must be original work.',
				'Article cannot express opinions.',
				'Must be a unique topic not yet on the platform.',
			],
			criteria: [
				{ 
					item: 'Relevant.', 
					desc: 'Must only be on a single topic. Strong educational content should be able to intuitively convey technically challenging concepts in a more compressed representation. Topic is related to an algorithm in artificial intelligence.'
				},
				{
					item: 'Detailed.',
					desc: 'Content should be clear and avoids hand-wavy explanations. All explanations are illustrated clearly and well-connected to the thesis.'
				},
				{
					item: 'Challenging.',
					desc: 'A well-explained advanced concept will be more likely to be accepted than a well-explained introductory topic.'
				}
			],
			timeline: [
				{
					event: 'Application opens',
					date: 'July 1, 2019'
				},
				{
					event: 'Application closes',
					date: 'July 31, 2019'
				},
				{
					event: 'Acceptance emails',
					date: 'August 3rd, 2019'
				},
				{
					event: 'IBM Scholars Dinner',
					date: 'September 6th, 2019'
				},
				{
					event: 'Conference',
					date: 'September 7th, 2019'
				}
			],
			who: [
				'You must be at least 18 years old to apply.'
			]
		}
	}
}
</script>

<style>
.conf-email {
	color: #000;
	text-decoration: underline;
}

.conf-email:hover {
	color: #655ba5;
}

.apply {
	font-weight: 600;
	font-size: 1em;
	color: #000;
}

.apply:hover {
	color: #655ba5;
}

ul {
	list-style-type:circle;
}

li {
	margin: 0 0 0 1.1em;
}

label {
	font-size: 13px;
	font-weight: 600;
	margin-right: 1em;
}
</style>