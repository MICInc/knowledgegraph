<template>
	<div class="knowledge">
		<PageNav></PageNav>
		<h2>{{ paper.title }}</h2>
		<div id="abstract">
			<h3>Abstract</h3>
			<p class='abstract'>{{ paper.content }}</p>
			<h3>Authors</h3>
			<span class='authors' v-for='author in paper.authors'>{{ author }}, </span>
			<h3>Original</h3>
			<span class='citation'><a v-bind:href='paper.url'>Original</a></span>
			<div id='related-work'>
				<h3>Related work</h3>
				<ul>
					<li v-for='work in paper.related'>
						<a v-bind:href='work.url'>{{ work.title }}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedArticle from '@/components/LinkedArticle.vue'

export default {
	name: 'knowledge',
	components: {
		PageNav,
	},

	data () {
		return {
			paper: {
				id: 0,
				title: 'Relational inductive biases, deep learning, and graph networks',
				authors: ['Peter W. Battaglia', 'Jessica B. Hamrick', 'Victor Bapst', 'Alvaro Sanchez-Gonzalez', 'Vinicius Zambaldi', 'Mateusz Malinowski', 'Andrea Tacchetti', 'David Raposo', 'Adam Santoro', 'Ryan Faulkner', 'Caglar Gulcehre', 'Francis Song', 'Andrew Ballard', 'Justin Gilmer', 'George Dahl', 'Ashish Vaswani', 'Kelsey Allen', 'Charles Nash', 'Victoria Langston', 'Chris Dyer', 'Nicolas Heess', 'Daan Wierstra', 'Pushmeet Kohli', 'Matt Botvinick', 'Oriol Vinyals', 'Yujia Li', 'Razvan Pascanu'],
				content: 'Artificial intelligence (AI) has undergone a renaissance recently, making major progress in key domains such as vision, language, control, and decision-making. This has been due, in part, to cheap data and cheap compute resources, which have fit the natural strengths of deep learning. However, many defining characteristics of human intelligence, which developed under much different pressures, remain out of reach for current approaches. In particular, generalizing beyond one\'s experiences--a hallmark of human intelligence from infancy--remains a formidable challenge for modern AI. The following is part position paper, part review, and part unification. We argue that combinatorial generalization must be a top priority for AI to achieve human-like abilities, and that structured representations and computations are key to realizing this objective. Just as biology uses nature and nurture cooperatively, we reject the false choice between "hand-engineering" and "end-to-end" learning, and instead advocate for an approach which benefits from their complementary strengths. We explore how using relational inductive biases within deep learning architectures can facilitate learning about entities, relations, and rules for composing them. We present a new building block for the AI toolkit with a strong relational inductive bias--the graph network--which generalizes and extends various approaches for neural networks that operate on graphs, and provides a straightforward interface for manipulating structured knowledge and producing structured behaviors. We discuss how graph networks can support relational reasoning and combinatorial generalization, laying the foundation for more sophisticated, interpretable, and flexible patterns of reasoning. As a companion to this paper, we have released an open-source software library for building graph networks, with demonstrations of how to use them in practice.',
				num_liked: 102,
				num_shared: 22,
				num_commented: 19,
				url: 'https://arxiv.org/abs/1806.01261',
				related: [
					{
						title: 'Deep Sets',
						url: '2018-zaheer-deep'
					}]
			}
		}
	},

	methods: {
		handleSubmit() {
			alert("You've submitted the form!")
		}
	}
}
</script>

<style scoped>

.input-row {
	display: flex;
	align-items: center;
}

</style>
