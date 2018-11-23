<template>
	<div class="home">
		<PageNav></PageNav>
		<div class="linked-articles-list">
			<div class="linked-article" v-for="article in articles" :key="article.id">
				<LinkedArticle :article="article"></LinkedArticle>	
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedArticle from '@/components/LinkedArticle.vue'
import ArticleService from '@/services/ArticleService'

export default {
	name: 'home',
	components: {
		LinkedArticle,
		PageNav,
	},

	data () {
		return {
			testArticles: [],
			articles:[
				{
					id: 0,
					title: 'This is a title',
					description: 'This is a description',
					num_liked: 102,
					num_shared: 22,
					num_commented: 19,
				},
				{
					id: 1,
					title: 'This is a second title',
					description: 'This is a second description',
					num_liked: 230,
					num_shared: 34,
					num_commented: 56,
				},
			],
		}
	},

	methods: {
		async getArticles () {
			return await ArticleService.getArticles()
		}
	},

	beforeMount () {
		this.getArticles().then((res) => {
			console.log(res)
		})
	}
	
}
</script>


<style scoped>
	
.linked-articles-list {
	margin: 25px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>
