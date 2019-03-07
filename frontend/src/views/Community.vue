<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="community">
			<h1>Community Page</h1>
			<router-link to="/community/start" tag="button">Start a community</router-link>
			<br>
			<div v-for="(community, index) in communities">
				<a :href="community.url">{{ community.name }}</a>
			</div>
		</div>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import CommunityService from '@/services/CommunityService'
import Footer from '@/components/Footer'

export default {
	name: 'community',
	components: {
		PageNav,
		Footer
	},
	beforeMount() {
		this.get_all().then((data) => {
			this.communities = data.data;
			console.log('communities: ');
			console.log(this.communities);
		});
	},
	data() {
		return {
			communities: [],
			form: {
				reveal: ''
			}
		}
	},
	methods: {
		async get_all() {
			return await CommunityService.getAll();
		}
	}
}
</script>

<style scoped>
	
.main {
	display: flex;
	flex-direction: column;
}

button {
	background: #502984;
	color: #FFF;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 30%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	background: #331a54;
	color: #FFF;
}

</style>
