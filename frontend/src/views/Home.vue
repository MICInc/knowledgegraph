<template>
	<div class="home main">
		<PageNav></PageNav>
		<div class="container">
			<div class="linked-content-list">
				<div class="linked-content" v-for="item in content" :key="item.id">
					<LinkedContent :content="item"></LinkedContent>	
				</div>
			</div>
			<div class="side-menu">
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedContent from '@/components/LinkedContent.vue'
import ContentService from '@/services/ContentService'
import Footer from '@/components/Footer'

export default {
	name: 'home',
	components: {
		LinkedContent,
		PageNav,
		Footer
	},

	data () {
		return {
			user: {
				id: -1
			},
			content:[]
		}
	},

	methods: {
		async getContent() {
			return await ContentService.getContent({ params: this.user })
			.then(function(data) {
				return data.data;
			});
		}
	},

	beforeMount() {
		this.getContent().then(data => {
			for(let k in data){
				this.content.push(data[k]);
			}
		});
	}
}
</script>


<style scoped>

.home {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	display: flex;
	min-width: 1080px;
}
	
.linked-content-list {
	flex: 1;
	padding: 15px;
	display: flex;
	flex-direction: column;
	border: 1px solid #3c3c3c;
	border-top: none;
}

.linked-content {
	margin: 5px 0;
}

</style>
