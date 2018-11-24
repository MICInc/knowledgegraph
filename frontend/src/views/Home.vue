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
			user: {
				id: -1
			},
			articles:[]
		}
	},

	methods: {
		async getArticles() {
			return await ArticleService.getArticles({ params: this.user })
			.then(function(data) {
				return data.data;
			});
		}
	},

	beforeMount () {
		this.getArticles().then((data) => {
			for(let k in data){
				this.articles.push(data[k]);
			}
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
