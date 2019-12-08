<template>
	<div id="about">
		<div class="container">
			<div class="section-head">
				<h2>About</h2>
			</div>
			<div class="about-conference">
				<h3>This Conference</h3>
				<p>Our mission for this conference is to democratize machine intelligence, promote diversity, build community, and inspire the next generation of
				researchers and engineers.</p>
			</div>
			<div class="about-mic">
				<h3>The Machine Intelligence Community - MIC</h3>
				<p>The idea behind the Machine Intelligence Community originated from the MIT Machine Learning Reading Group. The reading group started with students looking for an environment to learn about research advances in machine learning. The Machine Intelligence Community currently has branches at MIT, Boston University, Harvard College, and SRM Institute of Science and Technology.</p>
				<p>The Machine Intelligence Community has a set of core values it stands to uphold. All Machine Intelligence Community organizations must uphold these values.</p>
				<p><strong>1. Openness.</strong> The Machine Intelligence Community is inclusive and diverse.</p>
				<p><strong>2. Education.</strong> We aim to provide surface area for intellectual engagement. Our primary focus is teaching members and the community at-large about machine intelligence.</p>
				<p><strong>3. Community.</strong> By doing this, we hope to cultivate and connect communities and like-minded students to accelerate progress in machine intelligence.</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'About',
	}
</script>

<style scoped>

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	/*border: 1px solid #5d5499;*/
}

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

#about .container {
	color: #5d5499;
	padding-bottom: 50px;
}

#about .section-head {
	border-bottom: 1px solid #5d5499;
}

#about .section-head h2 {
	color: #fff;
	background: #5d5499;
}

#about .about-conference, .about-mic {
	padding: 20px;
	margin: 50px;
	background-color: #5d5499;
}

#about .about-conference p, .about-mic p {
	color: #fff;
}

#about h3 {
	color: #fff;
	font-size: 1.4em;
	border-bottom: 1px solid #fff;
	padding-bottom: 15px;
	margin: 0 0 10px 0;
}

</style>