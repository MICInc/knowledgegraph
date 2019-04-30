<template>
	<div id="our-community">
		<div class="container">
			<div class="section-head">
				<h2>Our Community</h2>
			</div>
			<div class="school-grid">
				<div class="school-tile">
					<a class="school-tile shield" v-for="(c, index) in community" :href="c.href">
						<img :src="c.img" :alt="c.alt">
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OurCommunity',
		data() {
			return {
				community: [{
					name: 'Massachusetts Institute of Technology MIC',
					href: 'http://machine-intelligence.mit.edu/',
					img: '/img/mic-schools/mit-logo.gif',
					desc: 'We are a community of undergraduates aimed at promoting and fostering the growing interest around machine intelligence on campus. We currently hold weekly discussions on the latest papers in the field, and also plan to organize crash courses, host speakers, and arrange competitions around machine intelligence at MIT.',
					alt: 'MIT Logo'
				},
				{
					name: 'Boston University MIC',
					href: 'http://mic.bu.edu/',
					img: '/img/mic-schools/bu-logo.png',
					desc: 'Boston University Machine Intelligence Community is an organization focused on providing opportunities for undergraduate and graduate students to learn about machine intelligence in a community environment. We are a student-led research group sponsored by Boston University\'s Rafik B. Hariri Institute for Computing and Computational Science and Engineering, BU Software Application and Innovation Lab (SAIL), and BU Spark.',
					alt: 'Boston University Logo'
				},
				{
					name: 'Harvard University MIC',
					href: 'https://harvard-mic.github.io/',
					img: '/img/mic-schools/harvard-logo.png',
					desc: 'We are a community of undergraduates at Harvard aiming to promote and foster interest in machine learning and artificial intelligence. We host technical workshops on advanced topics in machine learning, work on challenging real-world problems, discuss the current state of the field, and - most importantly - attempt to create a friendly and collaborative environment both for aspiring machine learning researchers and also for people who have just taken their first step into the fascinating and mysterious world of artificial intelligence. We seek to equip everyone with knowledge in machine learning and artificial intelligence and prepare them to face the new wave of the future.',
					alt: 'Harvard Logo'
				},
				{
					name: 'SRM Institute of Science and Technology MIC',
					href: '',
					img: '/img/mic-schools/srm-logo.png',
					desc: '',
					alt: 'SRM Logo'
				}]
			}
		}
	}
</script>

<style scoped>

.section-head {
	padding: 40px 0;
	margin: 0 50px;
}

.section-head h2 {
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 1.6em;
	font-weight: 600;
	padding: 20px;
	margin: 0;
	display: inline-block;
}

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	/*border: 1px solid #5d5499;*/
}

#our-community .container {
	color: #5d5499;
	padding-bottom: 50px;
}

#our-community .section-head  {
	border-bottom: 1px solid #5d5499;
}

#our-community .section-head h2 {
	color: #fff;
	background: #5d5499;
}

.school-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.school-grid .school-tile {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 50px 0 0 0;
	/*background-color: #000;*/
}

.school-tile .shield img {
	width: 120px;
	background: #fff;
	padding: 10px;
	border-radius: 75px;

}

.school-tile .description p.school-name {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
}

</style>