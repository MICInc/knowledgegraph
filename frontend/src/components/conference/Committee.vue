<template>
	<div class="committee">
		<div class="container">
			<div class="section-head">
				<h2>Conference Committee</h2>
			</div>
			<div class="columns">
				<div class="left">
					<div class="members">
						<div class="title">Head Coordinators</div>
						<div class="names">Justin Chen, Ajay Jain, Nikhil Murthy</div>
					</div>
					<div class="member">
						<div class="title">Workshop Coordinator and Community Outreach</div>
						<div class="name">Dan Pechi</div>
					</div>
					<div class="member">
						<div class="title">Panel Coordinator</div>
						<div class="name">Mirac Suzgun</div>
					</div>
					<div class="member">
						<div class="title">Website Coordinator</div>
						<div class="name">Devin de Hueck</div>
					</div>
					</div>
				<div class="right">
					<div class="member">
						<div class="title">Finance Coordinator</div>
						<div class="name">Isaac Wolverton</div>
					</div>
					<div class="member">
						<div class="title">Diversity Scholarship Chair</div>
						<div class="name">Chloe Kaubisch</div>
					</div>
					<div class="member">
						<div class="title">Sponsorship Chair</div>
						<div class="name">Charles Ma</div>
					</div>
					<div class="member">
						<div class="title">Branding</div>
						<div class="name">Tammy Qiu</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Committee',
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

.committee .container {
	background: #545f99;
	color: #fff;
	padding-bottom: 30px;
}

.committee .section-head  {
	border-bottom: 1px solid #fff;
}

.committee .section-head h2 {
	color: #545f99;
	background: #fff;
}

.committee .columns {
	display: flex;
	padding: 25px 50px 0 50px;
}

.committee .columns .left, #committee .columns .right {
	width: calc(50% - 20px);
}

.committee .columns .left {
	margin-right: 40px;
}

.committee .columns .member, #committee .columns .members {
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
}

.committee .columns .member .title, #committee .columns .members .title {
	font-weight: 600;
	font-size: 16px;
	margin-bottom: 5px;
	padding-bottom: 1px;
	border-bottom: 1px solid #fff;
	display: inline-block;
}

</style>