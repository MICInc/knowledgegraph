<template>
	<div class="container">
		<div>
			<h2>2020 Schedule</h2>
			<b>Location</b>: MIT
			<p><b>Date</b>: TBA</p>
			<p><b>Committee: </b>Julia Moseyko, Kathleen Esfahany, Lucia Vilallonga, Chloe Loughridge, Justin Chen, Kate Saenko</p>
			<h2>Schedule to be announced. Please check our social media for updates.</h2>
			<div id="#guide-wrapper">
				<div class="guide">
					<div class="room-key">
						<p></p>
					</div>
				</div>
			</div>
			<div class="event" :class="event.type" v-for="event in schedule2020">
				<div class="desc">
					<p class="time">{{ event.time }}</p>
					<p class="title">
						<span v-if="event.video != null">
							<b><a :href="event.video" target="_blank">{{ event.title }}</a></b>
						</span>
						<span v-else>
							{{ event.title }}
						</span>
					</p>
					<div v-if="event.speaker != null">
						<a v-if="event.speaker_id != null" :href="'/conference/speakers/2019/' + event.speaker_id">{{ event.speaker }}</a>
						<label v-else>{{ event.speaker }}</label>
					</div>
					<div v-else-if="event.panelists != null">
						<div class="flex" v-for="(panelist, i) in event.panelists">
							<a 
								v-if="event.panelists_ids[i] != ''" 
								:href="'/conference/speakers/2019/' + event.panelists_ids[i]">
								{{ panelist }}
							</a>
							<label v-else>{{ panelist }}</label>
						</div>
					</div>
				</div>
				<div class="rooms">
					<div v-for="room in event.rooms" :class="room"></div>
				</div>
			</div>
			<div id="sponsors">
				<div class="container">
					<div class="section-head">
						<h2>2020 Sponsors</h2>
					</div>
					<div class="tier-head">
						<h2>Adam Sponsors</h2>
					</div>
					<div class="sponsor-grid">
						<div class="sponsor-tile">
							<a v-for="(s, index) in sponsors.adam" :href="s.href" target="_blank">
								<img :class="s.tier" :src="s.src" :alt="s.alt"/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'schedule2019',
	beforeMount() {
	},
	data() {
		return {
			schedule2020: [
				// {
				// 	rooms: ["roomid"],
				// 	time: "TBA",
				// 	title: "TBA",
				// 	type: "misc",
				// },
			],
			sponsors: {
				adam: [
					{
						href: 'https://mitibmwatsonailab.mit.edu/',
						tier: 'tier-two',
						src: '/img/sponsors/mit-ibm-logo.png',
						alt: 'IBM'
					}
				]
			}
		}
	}
}
</script>

<style scoped>
.title {
	color: #000;
}

.cilse, .hariri, .breakout {
	width: 30px;
	height: 30px;
	border-radius: 15px;
	margin-left: 5px;
}

.cilse {
	background: #CC367A;
}

.hariri {
	background: #F9522B;
}

.breakout {
	background: #400578;

}

.container {
	max-width: 1140px;
	width: 90%;
	margin: 0 auto;
	/*border: 1px solid #5d5499;*/
}

.section-head {
	padding: 40px 0 0 0;
	margin: 0 50px;
}

.tier-head h2 {
	padding: 40px 0 0 0;
	margin: 0 50px;
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 1.6em;
	font-weight: 600;
	padding: 20px;
	margin: 0;
	display: inline-block;
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

#sponsors .tier-head {
	text-align: center;
}

#sponsors .section-head  {
	text-align: center;
}

#sponsors .section-head h2 {
	color: #fff;
	background: #5d5499;
}

#sponsors .sponsor-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	padding: 50px;
}

.sponsor-grid .sponsor-tile a {
	margin: 10px 50px 20px 50px;
}

.sponsor-grid .sponsor-tile img.partner {
	height: 70px;
}


.sponsor-grid .sponsor-tile img.tier-one {
	height: 100px;
}

.sponsor-grid .sponsor-tile img.tier-two {
	height: 110px;
}

.sponsor-grid .sponsor-tile img.tier-three {
	height: 150px;
}
</style>