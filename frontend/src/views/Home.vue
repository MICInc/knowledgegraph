<template>
	<div class="home">
		<PageNav></PageNav>
		<div class="linked-content-list">
			<div class="linked-content" v-for="item in content" :key="item.id">
				<LinkedContent :content="item"></LinkedContent>	
			</div>
		</div>
	</div>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import LinkedContent from '@/components/LinkedContent.vue'
import ContentService from '@/services/ContentService'

export default {
	name: 'home',
	components: {
		LinkedContent,
		PageNav,
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
	
.linked-content-list {
	margin: 25px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>
