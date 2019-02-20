<template>
	<div class="community main">
		<PageNav></PageNav>
		<div class="container">
			<h1>Community Page</h1>
			<router-link to="/community/start" tag="button">Start a community</router-link>
			<br>
			<a href="/mic/mit">MIT MIC</a>
		</div>
		<Footer></Footer>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import MemberReg from '@/components/MemberReg'
import Footer from '@/components/Footer'

export default {
	name: 'community',
	components: {
		PageNav,
		MemberReg,
		Footer
	},

	data() {
		return {
			form: {
				reveal: ''
			}
		}
	},
	methods: {
	}
}
</script>

<style scoped>
	
.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
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
