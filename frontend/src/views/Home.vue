<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="container">
			<nav>
				<ul>
					<li><router-link tag="a" to="/conference"><b>CONFERENCE</b></router-link></li>
					<li><router-link tag="a" to="/community"><b>COMMUNITY</b></router-link></li>
				</ul>
			</nav>
			<div class="linked-content-list">
				<!-- <div class="linked-content" v-for="item in content" :key="item.id">
					<LinkedContent :content="item"></LinkedContent>	
				</div> -->
			</div>
			<div class="side-menu">
			</div>
		</div>
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
	border-top: none;
}

.linked-content {
	margin: 5px 0;
}

nav {
	margin: 20px 0;
}

nav ul {
	list-style: none;
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
}

nav ul li {
	margin-left: 15px;
}

nav ul li:first-child {
	margin-left: 0;
}

nav ul li a {
	text-decoration: none;
	font-weight: 400;
	font-size: 14px;
	color: #000;
}

nav ul li a:hover {
	color: #655ba5;
}

</style>
