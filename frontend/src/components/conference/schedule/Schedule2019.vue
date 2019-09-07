<template>
	<div class="container">
		<div>
			<h2>2019 Schedule</h2>
			<b>Location</b>: Boston University
			<p>Rajen Kilachand Center for Integrated Life Sciences & Engineering and<br>Rafik B. Hariri Institute for Computing and Computational Science & Engineering</p>
			<p>Please note these are two separate buildings.</p>
			<p><b>Date</b>: September 7th, 2019</p>
			<p><b>Committee: </b>Justin Chen, Lucia Vilallonga, Daniel Zhou, Richard Khan</p>
			<p><b>Volunteers: </b>Justin Kwong, Julia Moseyko, Okoa Kinsey, Julio Nuñez, Ekaterina Gorbunova, Inhye Kim, Tabitha Oanda, Xiongxin Zen, Kate Saenkog</p>
			<div id="#guide-wrapper">
				<div class="guide">
					<div class="room-key">
						<p class="cilse room-icon"></p>CILSE Seminar Room
					</div>
					<div class="room-key">
						<p class="hariri room-icon"></p>Hariri Institute Seminar Room
					</div>
					<div class="room-key">
						<p class="breakout room-icon"></p>CILSE Conference Room
					</div>
				</div>
			</div>
			<div class="event" :class="event.type" v-for="event in schedule2018">
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
			schedule2018: [
			{
				rooms: ["cilse"],
				time: "9am - 10am",
				title: "Check in and Breakfast",
				type: "misc",
			},
			{
				rooms: ["cilse"],
				time: "10am - 10:10am",
				title: "Conference Kickoff",
				speaker: "",
				speaker_id: "",
				type: "keynote",
			},
			{
				rooms: ["cilse"],
				time: "10:10am - 10:30am",
				title: "Opening Keynote",
				speaker: "Kate Saenko, Boston University",
				speaker_id: "kate_saenko",
				type: "keynote"
			},
			{
				rooms: ["cilse"],
				time: "10:30am - 11:00am",
				title: "Online Bregman Divergence Learning",
				speaker: "Natalia Frumkin, Boston University",
				speaker_id: "natalia_frumkin"
			},
			{
				rooms: ["hariri"],
				time: "10:30am - 11:00am",
				title: "Learning with Limited Data",
				speaker: "Dat Huynh, Northeastern University",
				speaker_id: "dat_huynh"
			},
			{
				rooms: ["cilse"],
				time: "11:00am - 11:30am",
				title: "Natural Language Understanding via Commonsense Reasoning and Sensemaking",
				speaker: "Vasanth Sarathy, Tufts University",
				speaker_id: "vasanth_sarathy"
			},
			{
				rooms: ["hariri"],
				time: "11:00am - 11:30am",
				title: "Building Intelligent, Collaborative Robots",
				speaker: "Nishanth Kumar, Brown University",
				speaker_id: "nishanth_kumar"
			},
			{
				rooms: ["breakout"],
				time: "11:00am - 12:00pm",
				title: "Machine Intelligence Community, Inc. A Roadmap to Democratizing AI",
				speaker: "Justin Chen, Boston University",
				speaker_id: "justin_chen"
			},
			{
				rooms: ["cilse"],
				time: "11:30am - 12:00am",
				title: "Memento: Modeling Video Memorability",
				speaker: "Anelise Newman, MIT",
				speaker_id: "anelise_newman"
			},
			{
				rooms: ["hariri"],
				time: "11:30am - 12:00am",
				title: "Zorro - Preserve Your Privacy And Get Paid For It",
				speaker: "Anish Agarwal, MIT",
				speaker_id: "anish_agarwal"
			},
			{
				rooms: ["cilse"],
				time: "12:00pm - 1:00pm",
				title: "MIC Community Panel",
				panelists: ["Hassan Kané, MIT Alum", "Mehmet Efe Akengin, MIT Alum"],
				panelists_ids: ["hassan_kane", "efe_akengin"],
				type: "panel"
			},
			{
				rooms: ["breakout"],
				time: "12:00pm - 1:00pm",
				title: "Generative Models and Creativity",
				speaker: "Kristian Georgiev, MIT",
				speaker_id: "kristian_georgiev"
			},
			{
				rooms: ["cilse"],
				time: "12:15pm - 1:10pm",
				title: "Lunch",
				type: "lunch",
			},
			{
				rooms: ["hariri"],
				time: "12:15pm - 1:10pm",
				title: "IBM Technical Talk",
				speaker: "David Cox, IBM",
				speaker_id: "david_cox"
			},
			{
				rooms: ["cilse"],
				time: "1:10pm - 1:20pm",
				title: "Intermission"
			},
			{
				rooms: ["hariri"],
				time: "1:10pm - 1:20pm",
				title: "Intermission"
			},
			{
				rooms: ["cilse"],
				time: "1:20pm - 2:30pm",
				title: "IBM Women in Machine Intelligence Panel",
				panelists: ["Hong Yu, UMass Amherst", "Magy Seif El-Nasr, Northeastern", "Rosanne Liu, Uber AI", "Isha Puri, Harvard University"],
				panelists_ids: ["hong_yu", "magy_seif_elnasr", "rosanne_liu", "isha_puri"],
				type: "panel"
			},
			{
				rooms: ["breakout"],
				time: "1:20pm - 2:30pm",
				title: "AI & Climate Change: What Role Can Machine Learning Students, Engineers and Scientists Play in Leading the Transition Towards A Sustainable Future?",
				speaker: "Hassan Kané, MIT Alum",
				speaker_id: "hassan_kane"
			},
			{
				rooms: ["cilse"],
				time: "2:30pm - 3:00pm",
				title: "Learning to Simulate",
				speaker: "Nataniel Ruiz, Boston University",
				speaker_id: "nataniel_ruiz"
			},
			{
				rooms: ["hariri"],
				time: "2:30pm - 3:00pm",
				title: "Localizing and Amortizing: Efficient Inference For Gaussian Processes",
				speaker: "Lingfen Liu, Tufts University",
				speaker_id: "lingfen_liu"
			},
			{
				rooms: ["breakout"],
				time: "2:30pm - 3:30pm",
				title: "Machine Intelligence in Research and Industry",
				panelists: ["Julia Moseyko, MIT", "Efe Akengin, MIT Alum"],
				panelists_ids: ["julia_moseyko", "efe_akengin"],
				type: "panel"
			},
			{
				rooms: ["cilse"],
				time: "3:00pm - 3:30pm",
				title: "An Alternative Softmax Operator for Deep Reinforcement Learning",
				speaker: "Seungchan Kim, Brown University",
				speaker_id: "seungchan_kim"
			},
			{
				rooms: ["cilse"],
				time: "3:30pm - 4:00pm",
				title: "A Scalable and Freely Accessible Machine Learning Based Application for the Early Detection of Dyslexia",
				speaker: "Isha Puri, Harvard University",
				speaker_id: "isha_puri"
			},
			{
				rooms: ["cilse"],
				time: "4:00pm - 4:10pm",
				title: "Intermission"
			},
			{
				rooms: ["hariri"],
				time: "4:00pm - 4:10pm",
				title: "Intermission"
			},
			{
				rooms: ["cilse"],
				time: "4:10pm - 5:10pm",
				title: "Closing Keynote",
				speaker: "Aude Oliva, MIT",
				speaker_id: "aude_oliva"
			},
			{
				rooms: ["cilse"],
				time: "5:10pm",
				title: "Closing Remarks",
				speaker: "Justin Chen, MIC",
				type: "keynote"
			}
		]
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
</style>