<template>
	<div id="location-info">
		<div class="container">
			<div class="section-head">
				<h2>Location Info</h2>
			</div>
			<div class="columns">
				<div class="description">
					<h3>Boston University's Center for Integrated Life Sciences & Engineering</h3>
					<p>...</p>
					<p><strong>Address:</strong> 75 Amherst St, Cambridge, MA 02139</p>
				</div>
				<div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.1632077775325!2d-71.08945804902301!3d42.36036094297315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370a8b0f310c5%3A0x1a26a6e6bd5f8030!2sMIT+Media+Lab!5e0!3m2!1sen!2sus!4v1518495709713" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LocationInfo',
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

#location-info .section-head  {
	border-bottom: 1px solid #5d5499;
}

#location-info .section-head h2 {
	color: #fff;
	background: #5d5499;
}

#location-info .columns {
	display: flex;
	padding: 50px;
}

.columns .description {
	width: 50%;
	margin-right: 40px;
	padding: 35px;
	color: #fff;
	background: #5d5499;
}

.columns .description h3 {
	font-size: 1.4em;
	border-bottom: 1px solid #fff;
	padding-bottom: 10px;
	margin: 0 0 10px 0;
}

.columns .map {
	width: 50%;
}

.columns .map iframe {
	width: 100%;
}

</style>