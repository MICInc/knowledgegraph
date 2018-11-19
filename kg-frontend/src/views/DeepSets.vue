<template>
	<div class="deepsets">
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
						<router-link to='work.url'>{{ work.title }}</router-link>
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
	name: 'deepsets',
	components: {
		PageNav,
	},

	data () {
		return {
			paper: {
				id: 0,
				title: 'Deep Sets',
				authors: ['Manzil Zaheer', 'Satwik Kottur', 'Siamak Ravanbakhsh', 'Barnabas Poczos', 'Ruslan Salakhutdinov', 'Alexander Smola'],
				content: 'We study the problem of designing models for machine learning tasks defined on \emph{sets}. In contrast to traditional approach of operating on fixed dimensional vectors, we consider objective functions defined on sets that are invariant to permutations. Such problems are widespread, ranging from estimation of population statistics \cite{poczos13aistats}, to anomaly detection in piezometer data of embankment dams \cite{Jung15Exploration}, to cosmology \cite{Ntampaka16Dynamical,Ravanbakhsh16ICML1}. Our main theorem characterizes the permutation invariant functions and provides a family of functions to which any permutation invariant objective function must belong. This family of functions has a special structure which enables us to design a deep network architecture that can operate on sets and which can be deployed on a variety of scenarios including both unsupervised and supervised learning tasks. We also derive the necessary and sufficient conditions for permutation equivariance in deep models. We demonstrate the applicability of our method on population statistic estimation, point cloud classification, set expansion, and outlier detection.',
				num_liked: 102,
				num_shared: 22,
				num_commented: 19,
				url: 'https://arxiv.org/abs/1703.06114',
				related: [
					{
						title: 'Deep Sets',
						url: '2018-battaglia-relational'
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
