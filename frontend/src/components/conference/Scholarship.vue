<template>
	<div class="container">
		<PageNav></PageNav>
		<h3>IBM Diversity Scholarship 2019</h3>
		<p>
			This year we are offering ten travel scholarships. Our conference scholarships bring us one step closer in our mission. As part of the application, you are to develop an article on an artificial intelligence concept on the Machine Intelligence Community <a href="https://machineintelligence.cc/add">platform</a>. This can be a summary of a reseach paper, an article explaining an algorithm or math concept, or research that you are working on. Your research does not need to have been published, but the original work should be available online and a link should be provided. For examples, please refer to the following technical articles:
		</p>
		<ul>
			<li v-for="article in examples"><span v-html="article"></span></li>
		</ul>

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
		<h3>Help Us Materialize and Disseminate Knowledge</h3>
		<p>Develop an educational article on a topic of your choice. Acceptable articles should adhere to the following:</p>
		<h4>Basic requirements</h4>
		<ul>
			<li v-for="req in basics">{{ req }}</li>
		</ul>
		<h4>Technical evaluation</h4>
		<ul>
			<li v-for="req in criteria"><b>{{ req.item }}</b> {{ req.desc }}</li>
		</ul>
		<h3>Who should apply?</h3>
		<ul>
			<li v-for="req in who">{{ req }}</li>
		</ul>
		<p>Email us with questions at <a class="conf-email" href = "mailto: conference@machineintelligence.cc">conference@machineintelligence.cc</a></p>
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
				'Final article must be published on the platform. You must click the "publish" button in the top-left of the editor for it to be publicly viewable.',
				'All images, diagrams, graphics, quotes, research papers, resources and facts must be cited using eJournal in-text citation style (refer to Wikipedia or Distill.pub for examples).',
				'All content submitted must be original work.',
				'Article must be a unique topic not yet on the platform.',
				'There are no strict length requirements. However, you should expect to write the equivalent of at least 2 - 3 pages in a standard word document.'
			],
			criteria: [
				{ 
					item: 'Relevant.', 
					desc: 'Article focuses on technical merit of a specific topic in artificial intelligence.'
				},
				{
					item: 'Detailed.',
					desc: 'Explanations are illustrated clearly and overall article is coherent.'
				},
				{
					item: 'Complexity.',
					desc: 'If topic requires background information, the concepts are self-contained.'
				},
				{
					item: 'Clear.',
					desc: 'Article provides a diverse set of explanations and motivations.'
				}
			],
			examples: [
				"<a href=\"https://blog.evjang.com/2018/08/dijkstras.html\" target=\"_blank\">Dijkstra's in Disguise</a>",
				"<a href=\"https://distill.pub/2016/augmented-rnns/\" target=\"_blank\">Attention and Augmented Recurrent Neural Networks</a>",
				"<a href=\"https://weightagnostic.github.io/\" target=\"_blank\">Weight Agnostic Neural Networks</a>", 
				"<a href=\"https://medium.com/@karpathy/yes-you-should-understand-backprop-e2f06eab496b\" target=\"_blank\">Yes you should understand backprop</a>", 
				"<a href=\"http://www.offconvex.org/2019/06/03/trajectories/\" target=\"_blank\">Is Optimization a Sufficient Language for Understanding Deep Learning?</a>"
			],
			scholarship: [
				'Fully-paid round-trip flight for the conference',
				'Fully-paid hotel for the conference',
				'Night-before dinner with your IBM sponsors'
			],
			timeline: [
				{
					event: 'Application opens',
					date: 'July 2, 2019'
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
					event: 'Applicant confirmation',
					date: 'August 5th, 2019'
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