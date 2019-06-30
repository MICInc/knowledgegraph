<template>
	<div class="container">
		<PageNav></PageNav>
		<div>
			<h1>Machine Intelligence Conference 2019</h1>
			<ul>
				<li v-for="(sect, index) in sections">
					<a :href="'/conference/'+sect.href">{{ sect.innerText }}</a>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav'
import Footer from '@/components/Footer'

export default {
	name: 'conference',

	components: {
		PageNav,
		Footer
	},

	data() {
		return {
			sections: [
				{ innerText: 'Register', href: 'register' },
				{ innerText: 'Feedback', href: 'feedback' },
				{ innerText: 'Scholarship', href: 'scholarship' }
			]
		}
	}
}
</script>

<style scoped>

li {
	display:inline;
	margin: 0 1em 0 0;
}

button {
	width: 25%;
	height: 40px;
	font-size: 1em;
}

.container {
	flex: 1;
	width: 1080px;
}

</style>