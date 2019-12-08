<template>
	<div class="container">
		<h3>Frequently Asked Questions</h3>
		<p>
		</p>
		<ol class="faq">
			<li v-for="item in faq">
				<label><b>{{ item.q }}</b></label>
				<p v-html="item.a"></p>
			</li>
		</ol>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav'
export default {
	name: 'FAQ',
	components: {
		PageNav
	},
	data() {
		return {
			faq: [
				{
					q: 'I could not register.',
					a: 'We apologize for any issues. Please use either Firefox of Google Chrome.'
				},
				{
					q: 'I did not receive a conference registration confirmation email or account creation email.',
					a: 'Please email conference@machineintelligence.cc if you have this issue and we will look into it.'
				},
				{
					q: 'Can I write an article on a paper I published in another conference?',
					a: 'Yes. Submissions will only be evaluated on the criteria listed on the scholarship page.'
				},
				{
					q: 'Can I publish more than one article for the scholarship application?',
					a: 'Only one article will be evaluated for your scholarship application.'
				},
				{
					q: 'What is meant by underrepresented?',
					a: 'Please see this article on <a href=\"https://www.nsf.gov/statistics/2017/nsf17310/digest/introduction/\" target=\"_blank\">Women, Minorities, and Persons with Disabilities in Science and Engineering</a> by the National Science Foundation. If you identify as an underrepresented person, please apply.'
				},
				{
					q: 'Can the article be publically published on another website?',
					a: 'Your final submission must be published on our platform. All submissions must be your original work. We request articles are published on our platform so that MIC can continue to structure knowledge so that it can be further disseminated.'
				},
				{
					q: 'Why did we choose this application format?',
					a: 'Machine Intelligence Community\'s mission is to democratize artificial intelligence knowledge. Most content about AI currently occupies a small region of knowledge space around introductory concepts. This exists in the form of static media such as textbooks, blogs, classrooms, and videos. The remaining space is extremely sparse. We believe that to further democratize knowledge, sparse regions must be further materialized dynamically with reproducibility in mind.'
				}
			]
		}
	}
}
</script>

<style>
.faq {
	margin: 0 0 0 1em;
	padding: 0;
}
</style>
