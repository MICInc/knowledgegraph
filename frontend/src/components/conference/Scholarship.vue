<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>IBM Diversity Scholarship 2019</h3>
		<p>
			Our conference scholarships bring us one step closer in our mission. As part of the application, you are to develop an article on an artificial intelligence concept on the Machine Intelligence Community <a href="https://machineintelligence.cc">platform</a>. This can be a summary of a reseach paper, an article explaining an algorithm or math concept, or research that you are working on. Your research does not need to have been published, but the original work should be available online and a link should be provided.
		</p>

		<h3>Timeline</h3>
		<table>
			<col width="300">
			<col width="300">
			<tr v-for="t in  timeline">
				<td>{{ t.event }}</td>
				<td>{{ t.date }}</td>
			</tr>
		</table>
		<h3>The Scholarship</h3>
		<ul>
			<li v-for="item in scholarship">{{ item }}</li>
		</ul>
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
				'All images, diagrams, graphics, quotes, papers, resources and facts must be cited using in-text citations.',
				'All content submitted must be original work.',
				'Articles cannot express opinions.',
				'Must be a unique topic not yet on the platform.',
				'No strict length requirement, but expect to write at least 2 - 3 pages in a standard word document.'
			],
			criteria: [
				{ 
					item: 'Relevant.', 
					desc: 'Must focus on a single topic in artificial intelligence.'
				},
				{
					item: 'Detailed.',
					desc: 'Explanations are illustrated clearly and overall article is coherent.'
				},
				{
					item: 'Challenging.',
					desc: 'Technically advanced concepts are self-contained. Could a reader with basic undergraduate math understand your article?'
				}
			],
			scholarship: [
				'Fully-paid round-trip flight for the conference',
				'Fully-paid hotel for the conference',
				'Night-before dinner with your IBM sponsors'
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
				'You are at least 18 years old.',
				'You identify as an underrepresented junior researcher/ engineer studying artificial intelligence.',
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