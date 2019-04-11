<template>
	<div class="about">
		<PageNav></PageNav>
		<div class="container">
			<h1>Mission statement</h1>
			<p>{{ mission.statement }}</p>
			<h1>Board of Directors</h1>
			<span class="bod" v-for="member in bod">
				<label class="name">{{ member.name }}</label><br>
				<label class="position">{{ member.position }}</label><br>
				<p class="background">{{ member.background }}</p>
			</span>
		</div>
	</div>
</template>


<script>
import PageNav from '@/components/PageNav.vue'

export default {
	name: 'about',
	components: {
		PageNav,
	},

	data() {
		return {
			bod: [
				{
					name: 'Justin Chen',
					position: 'Founder and CEO',
					background: 'Justin first learned the words "artificial intelligence" from his aunt when he was seven and has been dreaming of a anime-inspired future ever since. He received both his Bachelor of Arts and Master of Science degrees in computer science from Boston University. During his graduate studies, he extensively researched decentralized asynchronous gradient-based optimization for deep neural networks. When not in class or doing research, he focused intensely on founding the Boston University Machine Intelligence Community. Today, he is a Director, the CEO, the Founder of the Machine Intelligence Community, Inc., which is a non-profit corporation in the process of becoming 501(c)(3), dedicated to democratizing machine intelligence by connecting communities, promoting diversity, providing mentorship, and developing educational material to empower the future leaders in machine intelligence.'
				},
				{
					name: 'Ajay Jain',
					position: 'Director',
					background: 'Ajay obtained a bachelor’s in science degree from MIT in two and a half years. During his time at MIT, he did research computer vision research at Facebook and Uber ATG in Toronto, and was president of the MIT Machine Intelligence Community.'
				},
				{
					name: 'Jacqueline Xu',
					position: 'Director',
					background: 'Jackie holds both a bachelor’s of science degree and master’s of science degree from MIT. During her time at MIT, she did extensive research in applying machine learning to emotional understanding and interned for Facebook’s Applied Machine Learning team, and was a graduate teaching assistant for course 6.034 - Introduction to Artificial Intelligence. After finishing her master’s she volunteered in Tibet and Mauritius to teach underprivileged students computer science. Today, she is a software engineer at Facebook in Palo Alto, CA. '
				},
				{
					name: 'Kate Saenko',
					position: 'Director',
					background: 'Kate is an Associate Professor of Computer Science at Boston University and director of the Computer Vision and Learning Group. Her research interests are in the broad area of Artificial Intelligence with a focus on Adaptive Machine Learning, Learning for Vision and Language Understanding, and Deep Learning and has published work that has been cited over 8000 times. She also leads the AI4ALL initiative at BU which empowers female high school students to study AI.'
				},

			],
			mission: {
				statement: 'The Machine Intelligence Community (MIC) is a non-profit organization which aims to democratize machine intelligence education, access, and contribution through college communities. Our central goals are to provide opportunities for students to learn about machine intelligence in a community environment, connect students with academic mentors, resources, and industry practitioners, and to foster the future leaders in machine intelligence.'
			}
		}
	}
}
</script>

<style>

a {
	text-decoration: none;
}	

.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
}


</style>