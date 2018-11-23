<template>
	<div class="article">
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
						<router-link v-bind:to="'/article/'+work.url">{{ work.title }}</router-link>
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
	name: 'article',
	components: {
		PageNav,
	},

	data () {
		return {
			id: this.$route.params.id,
			content: {},
			paper: {
				id: 0,
				title: '',
				authors: [],
				content: '',
				num_liked: 0,
				num_shared: 0,
				num_commented: 0,
				url: '',
				related: [],
				prereq: [],
				subsequent: []
			}
		}
	},

	created() {

	},

	methods: {
		handleSubmit() {
			alert('You\'ve submitted a new article!');
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
