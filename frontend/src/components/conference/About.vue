<template>
	<div id="about">
		<div class="container">
			<div class="section-head">
				<h2>About</h2>
			</div>
			<div class="about-conference">
				<h3>Why our conference?</h3>
				<p>
				The thesis of our conference originally stemmed from the idea of demonstrating the value that could be achieved when students who are passionate about machine intelligence unite as a larger, more inclusive and cognitively diverse community. Our conference serves as an even greater surface area for intellectual engagement for students outside of the classroom and beyond the boundaries of individual institutions. It is our mission and hope that the Machine Intelligence Conference will empower the next generation of students to take agency over the trajectory of their education, promote diversity that will fundamentally change the paradigm of our field and catalyze connections to accelerate progress in research and engineering to burgeon great ideas together as a Machine Intelligence Community.</p>
			</div>
			<div class="about-mic">
				<h3>What is Machine Intelligence Community (M.I.C.)?</h3>
				<p>Machine Intelligence Community originated from the MIT Machine Learning Reading Group, which was formed by undergraduate students looking for an environment to learn about research advances in machine learning outside the classroom. Today, MIC is a 501(c)(3) nonprofit with communities at MIT, Boston University, Harvard College and SRM Institute of Science and Technology.</p>
				<p>Machine Intelligence Community has a set of core values it stands to uphold. All Machine Intelligence Community organizations must uphold these values.</p>
				<p><strong>1. Openness.</strong> We are inclusive and diverse to welcome more minds to the field.</p>
				<p><strong>2. Education.</strong> We provide a surface area for intellectual engagement with machine intelligence.</p>
				<p><strong>3. Community.</strong> We cultivate and connect communities of students to accelerate progress in machine intelligence.</p>
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