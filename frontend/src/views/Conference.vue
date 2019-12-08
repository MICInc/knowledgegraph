<template>
	<div class="container">
		<PageNav></PageNav>
		<div>
			<h1>Machine Intelligence Conference</h1>
			<nav id="subnav">
				<ul>
					<li v-for="(sect, index) in sections">
						<a :href="'/conference/'+sect.href">{{ sect.innerText }}</a>
					</li>
				</ul>
			</nav>
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
				// { innerText: 'Register', href: 'register' },
				// { innerText: 'Feedback', href: 'feedback' },
				{ innerText: 'Scholarship', href: 'scholarship' },
				{ innerText: 'FAQ', href: 'faq'},
				{ innerText: 'Schedule', href: 'schedule/'+(new Date()).getFullYear()},
				{ innerText: 'Scholars', href: 'scholars' }
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

#subnav {
	margin: 5px 0;
	height: 1.5em;
	width: 100%;
	background-color: #fff;
}

#subnav ul li {
	margin-left: 15px;
}

#subnav ul li:first-child {
	margin-left: 0;
}

#subnav ul li a {
	text-decoration: none;
	font-weight: 500;
	font-size: 1em;
	color: #000;
}

#subnav ul li a:hover {
	color: #655ba5;
}

</style>