<template>
	<div class="container">
		<ul class="schd_yrs">
			Select year to view schedule:
			<li v-for="(conf, index) in schedules">
				<b><a :href="'/conference/schedule/'+conf">{{ conf }}</a></b>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
export default{
	name: 'schedule',
	data() {
		return{
			schedules: [2019, 2018]
		}
	}
}
</script>

<style>
li {
	display: inline;
	margin-right: 1em;
}

:root {
	--main-purple: #545f99;
}

body {
	font-family: 'Avenir', 'sans-serif';
}

a {
	color: var(--main-purple);
	text-decoration: underline;
}

header {
	margin: 20px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 0;
}

header h1 {
	margin-bottom: 0;
}

header div {
	flex: 1;
}

header a img {
	width: 65px;
}

#view-pdf {
	position: absolute;
  top: 20px;
  right: 20px;
}

.sticky {
	position: fixed;
	top: 0;
	width: 100%
}

.flex {
	display: flex;
	flex-wrap: wrap;
}

main {
	margin: 0 auto;
	margin-bottom: 40px;
	max-width: 850px;
}

main h2 {
	font-weight: 600;
	font-size: 26px;
}

main p {
	font-size: 16px;
}

/*section#schedule-by-room > div {
	width: 100%;
}*/

.event {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	border-top: 1px solid #000;
}

.event .desc p {
	margin: 0;
}

.event .desc .flex a {
	margin-right: 5px;
}

.event .desc .time {
	font-weight: 600;
}

.event .desc .speaker {
	font-style: italic;
}

.event .rooms {
	display: flex;
	align-items: center;
}

.guide {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	background: #fff;
}

.room-key {
	display: flex;
	align-items: center;
}

.room-key, .room-icon {
	margin-right: 5px;
}

.schd_yrs {
	margin: 1.5em 0 0 0;
}

.schd_yrs li a {
	text-decoration: none !important;
}

/*--------------------
				Mobile
--------------------*/


@media screen and (max-width: 900px) {

	main {
		margin: 0 20px 20px 20px;
	}

}
</style>