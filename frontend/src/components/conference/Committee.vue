<template>
	<div id="committee">
		<div class="container">
			<div class="section-head">
				<h2>Conference Committee</h2>
			</div>
			<div class="columns">
				<div class="left">
					<div class="members" v-for="(member, index) in committee.slice(0,committee.length/2)">
						<div class="title">{{ member.title }}</div>
						<div class="names">{{ member.name }}</div>
					</div>
				</div>
				<div class="right">
					<div class="members" v-for="(member, index) in committee.slice(committee.length/2)">
						<div class="title">{{ member.title }}</div>
						<div class="names">{{ member.name }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Committee',
		data() {
			return {
				committee: [
					{ name: 'Julia Moseyko', title: 'General Chair' },
					{ name: 'Kathleen Esfahany', title: 'Communication Chair' },
					{ name: 'Lucia Vilallonga', title: 'Diversity and Inclusion Chair' },
					{ name: 'Chloe Loughridge', title: 'Scholarship Chair' },
					{ name: 'Justin Chen, Kate Saenko', title: 'Advisors' },
				]
			}
		}
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

#committee .container {
	padding-bottom: 30px;
	color: #5d5499;
}

#committee .section-head  {
	border-bottom: 1px solid #fff;
}

#committee .section-head h2 {
	color: #fff;
	background: #5d5499;
}

#committee .columns {
	display: flex;
	padding: 25px 50px 0 50px;
}

#committee .columns .left, #committee .columns .right {
	width: calc(50% - 20px);
}

#committee .columns .left {
	margin-right: 40px;
}

#committee .columns .member, #committee .columns .members {
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
}

#committee .columns .member .title, #committee .columns .members .title {
	font-weight: 600;
	font-size: 16px;
	margin-bottom: 5px;
	padding-bottom: 1px;
	border-bottom: 1px solid #fff;
	display: inline-block;
}

</style>