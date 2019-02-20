<template>
	<div id="community-reg">
		<PageNav></PageNav>
		<div id="body">
			<div>
				<h2>Join the Machine Intelligence Community</h2>
				<p>
					Extend your community's network!
					Before you start a community checkout our Machine Intelligence Community agreement, general code of conduct, and media kit!
					Mention something about why a community should join and mission statement...
				</p>
			</div>
			<form id="community-reg-form">
	 			<label class="expand-section" v-on:click="show_schools()">I.  Where will MIC's next community be?</label>
				<select id="schools" v-if="form.has_schools" v-model.trim="org.school">
					<option v-for="school in form.schools">{{ school.name }}</option>
				</select>
				<label class="expand-section" v-on:click="show_established_form()">II. Does your community already exist?</label>
				<div v-if="form.exists">
					<label class="field-header">What's the name of your organization?</label><br>
					<input class="full-width" type="text" v-model.trim="org.name"><br>
					<label class="field-header">When was your organization established?</label><br>
					<input type="text" class="full-width" v-model.number="org.established"><br>
					<span>
						<label class="field-header" v-if="org.name.length == 0">Is your organization affiliated with an institution?</label>
						<label class="field-header" v-else>Is {{ org.name }} affiliated with an institution? </label>
					</span><br>
					<input type="radio" value="yes" v-model="org.aff_exists"> Yes
					<input type="radio" value="no" v-model="org.aff_exists"> No
					<br>
					<span v-if="org.aff_exists == 'yes'">
						<label class="field-header">What's the name of the institution:</label>
						<br>
						<input type="text" class="full-width" v-model.trim="org.affiliation.name"><br>
						<label class="field-header">Who can we contact at your institution?</label>
						<br>
						Name: <input type="text" class="full-width" v-model.trim="org.affiliation.contact.name"><br>
						Email: <input type="text" class="full-width" v-model.trim="org.affiliation.contact.email"><br>
					</span>
					<label class="expand-section" v-on:click="show_core()">Who will be {{ org.name }}'s executives upon joining MIC?</label>
				</div>
				<div v-else>
					<span v-on:click="show_core()">
						<label class="expand-section" v-if="org.school.length > 0">Who will be {{ org.school }} MIC's executives?</label>
						<label class="expand-section" v-else>III. Who are your executives?</label>
					</span>
				</div>
				<div v-if="form.has_core" v-for="(value, index) in org.execs.core">
					<div class="name">
						<div>
							<input class="core-exec" :placeholder="value.position" disabled>
							<input :ref="'exec_first_name'+index" type="text" placeholder="First name" v-model.trim="org.execs.core[index].first_name">
							<input :ref="'exec_last_name'+index" type="text" placeholder="Last name" v-model.trim="org.execs.core[index].last_name">
							<input :ref="'exec_email'+index" type="text" placeholder="Email" v-model.trim="org.execs.core[index].email">
						</div>
					</div>
				</div>
				<label class="expand-section" v-on:click="extend_board()">IV. Who else is on your executive board?</label>
				<span v-if="form.more_board">
					<div v-for="(value, index) in org.execs.misc">
						<input class="more-execs" :ref="'exec'+index" type="text" placeholder="Position/Role" v-model.trim="org.execs.misc[index].position">
						<input class="more-execs" :ref="'exec'+index" type="text" placeholder="First name" v-model.trim="org.execs.misc[index].first_name">
						<input class="more-execs" :ref="'exec'+index" type="text" placeholder="Last name" v-model.trim="org.execs.misc[index].last_name">
						<input class="more-execs" :ref="'exec'+index" type="text" placeholder="Email" v-model.trim="org.execs.misc[index].email" v-on:keyup.enter="add_exec(index)">
					</div>
				</span>
				<label class="expand-section" v-on:click="extend_advisors()">V. Does your organaization have advisors?</label>
				<div v-if="form.more_advisors" v-for="(value, index) in org.advisors">
					<input class="advisor-field" :ref="'advisor_first'+index" type="text" placeholder="First name" v-model.trim="org.advisors[index].first_name">
					<input class="advisor-field" :ref="'advisor_last'+index" type="text" placeholder="Last name" v-model.trim="org.advisors[index].last_name">
					<input class="advisor-field" :ref="'advisors_email'+index" type="text" placeholder="Email" v-model.trim="org.advisors[index].email" v-on:keyup.enter="add_advisor(index)">
				</div>
				<button v-on:click.prevent="submit">Submit</button>
				<span v-if="form.server_resp.length > 0">{{ form.server_resp }}</span>
			</form>
		</div>
	</div>
</template>

<script>
import CommunityService from '@/services/CommunityService';
import institutions from '@/data/schools.json'
import PageNav from '@/components/PageNav'

export default {
	name: 'community-reg',
	components: {
		PageNav
	},
	data() {
		return {
			form: {
				exists: false,
				funding_freq: ['Annually', 'Semesterly', 'Quarterly', 'Monthly', 'Weekly', 'Daily'],
				schools: institutions,
				aff_exists: false,
				server_resp: '',
				more_board: false,
				more_advisors: false,
				has_core: false,
				has_schools: false
			},
			org: {
				advisors: [{}],
				affiliation: {
					name: '',
					contact: {
						email: '',
						name: ''
					}
				},
				established: 0,
				execs: {
					core: [
					{
						position: 'President',
						first_name: '',
						last_name: '',
						email: ''
					},
					{
						position: 'Secretary',
						first_name: '',
						last_name: '',
						email: ''
					},
					{
						position: 'Treasurer',
						first_name: '',
						last_name: '',
						email: ''
					},
					{
						position: 'Vice President',
						first_name: '',
						last_name: '',
						email: ''
					}],
					misc: [{}]
				},
				members: [],
				name: '',
				school: ''
			}
		}
	},
	methods: {
		add_advisor(index) {
			var next = index + 1;
			this.org.advisors.splice(next, 0, {});
		},
		add_exec(index) {
			var next = index + 1;
			this.org.execs.misc.splice(next, 0, {});
		},
		add_funding(index) {
			var next = index + 1;
			this.org.funding.splice(next, 0, {});
		},
		extend_advisors() {
			this.form.more_advisors = !this.form.more_advisors;
		},
		extend_board() {
			this.form.more_board = !this.form.more_board;
		},
		remove_advisor(index) {
			var arr = this.org.advisors;
			if(arr.length <= 1) {
				arr[index] = {};
			}
			else {
				this.org.advisors.splice(index, 1);
			}
		},
		show_core() {
			this.form.has_core = !this.form.has_core;
		},
		show_established_form() {
			this.form.exists = !this.form.exists;
		},
		show_funds() {
			this.form.has_funds = !this.form.has_funds;
		},
		show_schools() {
			this.form.has_schools = !this.form.has_schools;
		},
		submit() {
			CommunityService.submitCommunity(this.org)
			.then((data) => {
				this.form.server_resp = data['data'];
			});
		}
	}
}
</script>
<style scoped>

#body {
	margin: 0px 30%; 
}

button {
	background: #502984;
	color: #FFF;
	display: flex;
	align-items: center;
	vertical-align: middle;
	display: inline-block;
	width: 100%;
	height: 40px;
	font-size: 1em;
}

button:hover {
	background: #331a54;
	color: #FFF;
}

.main {
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
	width: 1080px;
}

.form-button {
	margin-bottom: 15px;
}

form {
	display: flex;
	flex-direction: column;
	align-items: baseline;
}

.name {
	display: flex;
	flex-direction: column;
}

.full-width {
	margin-left: 10px;
	width: 100%;
}

label {
	font-size: 13px;
	font-weight: 600;
}

input {
	margin-right: 10px;
	border: none;
	max-width: 100%;
}

.name div {
	display: flex;
}

.core-exec {
	margin-right: 0px;
	width: 110px;
}

.core-exec::placeholder {
	color: black;
}

.more-execs-sect {
	background: black
}

.more-execs {
	width: 23%;
	margin-left: 0px;
	margin-right: 0px;
}

.advisor-field {
	margin-right: 0px;
	margin-left: 0px;
	width: 31%;
}

.expand-section {
	font-size: 1.5em;
	cursor: pointer;
}

.expand-section:hover {
	color: #593c75;
}

.field-header {
	font-size: 1em;
}

#schools {
	font-size: 1em;
}

</style>