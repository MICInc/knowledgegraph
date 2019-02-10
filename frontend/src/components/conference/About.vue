<template>
	<div class="about">
		<div class="container">
			<div class="section-head">
					<h2>About</h2>
			</div>
			<div class="about-conference">
					<h3>This Conference</h3>
					<p>The Machine Intelligence Conference will be held annually by all constituent MIC schools. Our mission for this conference is to democratize machine intelligence, promote diversity, build community, and inspire the next generation of
					researchers and engineers.</p>
					<p><strong>Application Timeline: </strong>Due to an exciting amount of interest and an unfortunate lack of space we will not be able to accept every attendee application. To ensure as many people as possible can attend, we are accepting
					applications on a rolling basis. The first round of acceptances will be sent out <strong> September 15th</strong> and confirmation responses are due <strong>September 22nd</strong>. The second round of acceptances will be sent
					out <strong>September 23rd</strong> and confirmation responses are due <strong>September 30th</strong>. If there are still spots available after the second round, we will allow a limited number of walk-ons day of the conference.Please be aware that if you are accepted but do not confirm your spot will be given to another. </p>
					<p><strong>Please Note: </strong>There is a limit of 350 attendees to this inaugural conference. Student applications will be prioritized and non .edu emails will not receive a confirmation email, but will not lose a place in the application queue. Attendees must be 18 years of age or older - attendees in high school will be asked to show a photo ID.</p>
			</div>
			<div class="about-mic">
					<h3>The Machine Intelligence Community - MIC</h3>
					<p>The idea behind the Machine Intelligence Community originated from the MIT Machine Learning Reading Group. The reading group started with students looking for an environment to learn about research advances in machine learning. The Machine Intelligence Community currently has branches at MIT, Boston University, Harvard, and Tufts.</p>
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
	border: 1px solid #545f99;
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

.about .container {
	background: #545f99;
	color: #fff;
	padding-bottom: 50px;
}

.about .section-head {
	border-bottom: 1px solid #fff;
}

.about .section-head h2 {
	color: #545f99;
	background: #fff;
}

.about .about-conference {
	margin: 50px 0;
}

.about .about-conference, .about-mic {
	padding: 0 50px;
}

.about h3 {
	font-size: 1.4em;
	border-bottom: 1px solid #fff;
	padding-bottom: 15px;
	margin: 0 0 10px 0;
}

</style>