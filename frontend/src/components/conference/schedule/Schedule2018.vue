<template>
	<div class="container">
		<div>
			<h2>2018 Schedule</h2>
			<p><b>Location</b>: MIT Media Lab, 6th floor</p>
			<p><b>Date</b>: November 3rd, 2018</p>
			<div id="#guide-wrapper">
				<div class="guide">
					<div class="room-key">
						<p class="mpr room-icon"></p>Multi-purpose Room
					</div>
					<div class="room-key">
						<p class="ssr room-icon"></p>Silverman Skyline Room
					</div>
					<div class="room-key">
						<p class="lh room-icon"></p>Lecture Hall
					</div>
					<div class="room-key">
						<p class="wgr room-icon"></p>Winter Garden Room
					</div>
				</div>
			</div>
			<div class="event" :class="event.type" v-for="event in schedule2018">
				<div class="desc">
					<p class="time">{{ event.time }}</p>
					<p class="title">{{ event.title }}</p>
					<div v-if="event.speaker != null">
						<a v-if="event.speaker_id != null" :href="'/conference/speakers/2018/' + event.speaker_id">{{ event.speaker }}</a>
						<label v-else>{{ event.speaker }}</label>
					</div>
					<div v-else-if="event.panelists != null">
						<div class="flex" v-for="(panelist, i) in event.panelists">
							<a 
								v-if="event.panelists_ids[i] != ''" 
								:href="'/conference/speakers/2018/' + event.panelists_ids[i]">
								{{ panelist }}
							</a>
							<label>{{ panelist }}</label>
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
	name: 'schedule2018',
	beforeMount() {
	},
	data() {
		return {
			schedule2018: [
			{
				rooms: ["wgr"],
				time: "8am - 10am",
				title: "Check in and Breakfast",
				type: "misc",
			},

			{
				rooms: ["lh"],
				time: "9am - 10am",
				title: "Keynote Livestream for Overflow",
				type: "keynote",
			}, 

			{
				rooms: ["mpr"],
				time: "9am - 9:10am",
				title: "Conference Kickoff",
				speaker: "Justin Chen, MIC",
				speaker_id: "justin_chen",
				type: "keynote",
			},

			{
				rooms: ["mpr"],
				time: "9:10am - 9:30am",
				title: "Opening Industry Keynote",
				speaker: "Matt Scott, Malong",
				speaker_id: "matt_scott",
				type: "keynote",
			},

			{
				rooms: ["mpr"],
				time: "9:30am - 10am",
				title: "Opening Research Keynote",
				speaker: "Leslie Kaelbling, MIT",
				speaker_id: "leslie_kaelbling",
				type: "keynote",
			},

			{
				rooms: ["mpr"],
				time: "10am - 10:30am",
				title: "Real-World Adversarial Examples",
				type: "student-talk",
				speaker: "Jessy Lin, MIT",
				speaker_id: "jessy_lin",
			},  

			{
				rooms: ["lh"],
				time: "10am - 11:30am",
				title: "Machine Learning for Satellite Image Analysis and From Visual Recognition to Visual Understanding",
				panelists: ["Danil Kirsanov, Facebook", "Laurens van der Maaten"],
				panelists_ids: ["danil_kirsanov", "laurens_van_der_maaten"],
				type: "sponsor-talk",
			},

			{
				rooms: ["ssr"],
				time: "10am - 11am",
				title: "Industry Panel",
				panelists: ["Matt Scott, Malong", "Ellick Chan, Intel", "Hassan Kane, Sela", "Simanta Gautam, Synapse"],
				panelists_ids: ["matt_scott", "ellick_chan", "hassan_kane", "simanta_gautam"], 
				type: "panel",
			}, 

			{
				rooms: ["mpr"],
				time: "10:30am - 11am",
				title: "Spatio-temporal Grounding in Visual Data",
				speaker: "Sarah Bargal, Boston University",
				speaker_id: "sarah_bargal",
				type: "student-talk",
			}, 

			{
				rooms: ["wgr"],
				time: "11am - noon",
				title: "Coffee Break",
				type: "misc",
			}, 

			{
				rooms: ["mpr"],
				time: "11am - noon",
				title: "Women in MI Panel",
				panelists: ["Kate Saenko", "Jacqueline Xu", "Sophie Watson", "Millie Liu"],
				panelists_ids: ["kate_saenko", "jacqueline_xu", "sophie_watson", "millie_liu"],
				type: "panel",
			},  

			{
				rooms: ["ssr"],
				time: "11am - 11:30am",
				title: "RISE: Randomized Input Sampling for Explanation of Black-box Models",
				type: "student-talk",
				speaker: "Vitali Petsiuk, Boston University",
				speaker_id: "vitali_petsiuk",
			},  

			{
				rooms: ["lh"],
				time: "11:30am - 1:00pm",
				title: "Nvidia Talks: Data-Driven Dataset Creation: Deep Active Learning for Autonomous Vehicles and Beyond and Sparse High-Dimensional Neural Networks",
				panelists: ["Adam Lesnikowski", "Varun Jampani"],
				panelists_ids: ["adam_lesnikowski", "varun_jampani"],
				type: "sponsor-talk",
			},

			{
				rooms: ["ssr"],
				time: "11:30am - noon",
				title: "The Sounds of Pixels",
				speaker: "Hang Zhou, MIT",
				type: "student-talk",
			},

			{
				rooms: ["wgr"],
				time: "noon - 1:30pm",
				title: "Lunch",
				type: "lunch",
			}, 

			{
				rooms: ["mpr"],
				time: "noon - 1pm",
				title: "Women in MI Lunch",
				type: "lunch",
			}, 

			{
				rooms: ["ssr"],
				time: "noon - 1pm",
				title: "Alumni Panel",
				panelists: ["Ali-Amir Aldan", "Bristy Sikder", "Jacqueline Xu", "Jeremy Nixon", "Michael Chang", "Mohamed Hassan Kane", "Shraman Ray Chaudhuri", "Simanta Gautam", "Surya Bhupatiraju"],
				panelists_ids: ["ali_amir_aldan", "bristy_sikder", "jacqueline_xu", "jeremy_nixon", "michael_chang", "hassan_kane", "shaman_ray_chaudhuri", "simanta_gautam", "surya_bhupatiraju"],
				type: "panel",
			},  

			{
				rooms: ["mpr"],
				time: "1:30pm - 2pm",
				title: "Your Children and AI",
				type: "student-talk",
				speaker: "Olivia Koshy, UC Berkeley",
				speaker_id: "olivia_koshy"
			}, 

			{
				rooms: ["lh"],
				time: "1:30pm - 3pm",
				title: "CurriculumNet: Weakly Supervised Learning from Large-Scale Web Images",
				speaker: "Matt Scott, Malong",
				speaker_id: "matt_scott",
				type: "sponsor-talk",
			}, 


			{
				rooms: ["ssr"],
				time: "1:30pm - 2pm",
				title: "Performance Boosting Methods in Semi-Supervised NLP Neural Net Environments",
				type: "student-talk",
				speaker: "Thalia Rossitter, Simmons University",
				speaker_id: "thalia_rossitter",
			}, 

			{
				rooms: ["mpr"],
				time: "2pm - 2:30pm",
				title: "TimbreTron: A WaveNet(CycleGAN(CQT(Audio))) Pipeline for Musical Timbre Transfer",
				type: "student-talk",
				speaker: "Sheldon Huang, University of Toronto",
				speaker_id: "sicong_sheldon_huang"
			}, 
			
			{
				rooms: ["ssr"],
				time: "2pm - 2:30pm",
				title: "Moment of change: Predicting Cognitive Restructuring in Online Mental Health Forums",
				speaker: "Yada Pruksachatkun, NYU",
				speaker_id: "yada_pruksachatkun",
				type: "student-talk",
			},  

			{
				rooms: ["mpr"],
				time: "2:30pm - 3pm",
				title: "The Semantic-Hypnotic Model of Music Perception",
				type: "student-talk",
				speaker: "Ari Brown, Tufts University",
				speaker_id: "ari_brown",
			},  

			{
				rooms: ["ssr"],
				time: "2:30pm - 3pm",
				title: "What can artificial intelligence teach economics?",
				type: "student-talk",
				speaker: "Guy Aridor, Columbia University",
				speaker_id: "guy_aridor",
			},

			{
				rooms: ["wgr"],
				time: "2:30pm - 4:30pm",
				title: "Coffee Break",
				type: "misc",
			}, 

			{
				rooms: ["mpr"],
				time: "3pm - 3:30pm",
				title: "Multilingual Text Search in Image Collection",
				type: "student-talk",
				speaker: "Jessica Edwards, Harvard College",
				speaker_id: "jessica_edwards",
			}, 

			{
				rooms: ["lh"],
				time: "3pm - 4:30pm",
				title: "Tensorflow optimizations and performance tuning for Intel platforms",
				panelists: ["Ellick Chan, Intel", "Jude Shavlik, Intel"],
				panelists_ids: ["ellick_chan", ""],
				type: "sponsor-talk",
			},  

			{
				rooms: ["ssr"],
				time: "3pm - 3:30pm",
				title: "Creating Synthetic Data for Deep Learning Applications",
				type: "student-talk",
				speaker: "Mona Jalal, Boston University",
				speaker_id: "mona_jalal",
			}, 

			{
				rooms: ["mpr"],
				time: "3:30pm - 4pm",
				title: "Learning with text-based games",
				speaker: "David Tao, McGill University",
				speaker_id: "ruo_yu_david_tao",
				type: "student-talk",
			},

			{
				rooms: ["ssr"],
				time: "3:30pm - 4pm",
				title: "Deep Learning for ELVO Stroke Detection",
				type: "student-talk",
				panelists: ["Mary Dong, Brown University", "Amy Wang, Brown University"],
				panelists_ids: ["mary_dong", "amy_wang"]
			},  

			{
				rooms: ["mpr"],
				time: "4pm - 4:30pm",
				title: "Targeted Dropout and Bitrot: Simple and Effective Techniques for Sparsification and Quantization",
				type: "student-talk",
				speaker: "Aidan Gomez, University of Oxford",
				speaker_id: "aidan_gomez"
			}, 

			{
				rooms: ["ssr"],
				time: "4pm - 4:30pm",
				title: "Using Quality-of-Life Scores to Guide Prostate Radiation Therapy Dosing",
				type: "student-talk",
				speaker: "Giulia Pintea, Simmons University",
				speaker_id: "giulia_pintea",
			}, 

			{
				rooms: ["mpr"],
				time: "4pm - 5pm",
				title: "Closing Keynote",
				speaker: "Kenneth Stanley, University of Central Florida & Uber AI Labs",
				speaker_id: "kenneth_stanley",
				type: "keynote",
			},

			{
				rooms: ["lh", "ssr"],
				time: "4pm - 5:10pm",
				title: "Keynote Livestream for Overflow",
				type: "keynote",
			}, 

			{
				rooms: ["mpr"],
				time: "5pm - 5:10pm",
				title: "Closing Remarks",
				speaker: "Dan Pechi, Tufts University MIC",
				type: "keynote",
			}
		]
		}
	}
}
</script>

<style scoped>
.mpr, .ssr, .lh, .wgr {
	width: 30px;
	height: 30px;
	border-radius: 15px;
	margin-left: 5px;
}

.mpr {
	background: #ffae76;
}

.ssr {
	background: #ff688b;
}

.lh {
	background: #ff94d0;
}

.wgr {
	background: #d66fff;
}
</style>