<template>
	<div id="community-reg" class="community main">
		<PageNav></PageNav>
		<div>
			<h2>READ.ME</h2>
			<p>
				Before you start a community checkout our Machine Intelligence Community agreement, general code of conduct, and media kit!
			</p>
		</div>
		<form id="community-reg-form">
 			<label>Where will MIC's next community be?</label>
			<select v-model.trim="org.school">
				<option v-for="school in form.schools">{{ school.name }}</option>
			</select>
			<label>Does your community already exist?</label>
			<input type="checkbox" value="yes" v-model="form.exists">
			<div v-if="form.exists">
				<label>What's the name of your organizaion?</label><br>
				<input type="text" class="mar-left" v-model.trim="org.name"><br>
				<span v-if="org.name.length > 0">
					<label>Is {{ org.name }} affiliated with an institution? </label>
					<input type="checkbox" value="yes" v-model="org.aff_exists">
					<br>
					<span v-if="org.aff_exists">
						<label>What's the name of the institution:</label>
						<br>
						<input type="text" class="mar-left" v-model.trim="org.affiliation.name"><br>
						<span v-if="org.affiliation.name.length > 0">
							<label>Who can we contact at {{ org.affiliation.name }}?</label><br>
							Name: <input type="text" class="mar-left" v-model.trim="org.affiliation.contact.name"><br>
							Email: <input type="text" class="mar-left" v-model.trim="org.affiliation.contact.email"><br>
						</span>
					</span>
					<label>Who will be {{ org.name }}'s executives upon joining MIC?</label>
				</span>
			</div>
			<div v-else>
				<label>Who will be {{ org.school }} MIC's executives?</label>
			</div>
			<div v-for="(value, index) in org.execs.core">
				<div class="name">
					<label>{{ value.position }}:</label>
					<div>
						<input :ref="'exec_first_name'+index" type="text" placeholder="First name" v-model.trim="org.execs.core[index].first_name">
						<input :ref="'exec_last_name'+index" type="text" placeholder="Last name" v-model.trim="org.execs.core[index].last_name">
					</div>
				</div>
			</div>
			<label>Additional executives</label>
			<div v-for="(value, index) in org.execs.misc">
				<input :ref="'exec'+index" type="text" placeholder="First name" v-model.trim="org.execs.misc[index].first_name">
				<input :ref="'exec'+index" type="text" placeholder="Last name" v-model.trim="org.execs.misc[index].last_name" v-on:keyup.enter="add_exec(index)">
			</div>
			<label v-if="form.exists">Does {{ org.name }} have advisors?</label>
			<label v-else>Does {{ org.school }} MIC have advisors?</label>
			<div v-for="(value, index) in org.advisors">
				<input :ref="'advisor_first'+index" type="text" placeholder="First name" v-model.trim="org.advisors[index].first_name">
				<input :ref="'advisor_last'+index" type="text" placeholder="Last name" v-model.trim="org.advisors[index].last_name" v-on:keyup.enter="add_advisor(index)">
			</div>
			<label>What are your current sources of funding?</label>
			<div v-for="(value, index) in org.funding">
				<input type="text" placeholder="Source" v-model.trim="org.funding[index].src">
				<input type="text" placeholder="$ (USD)" v-model.number="org.funding[index].amount" v-on:keyup.enter="add_funding(index)">
				<select v-model.trim="org.funding[index].frequency">
					<option v-for="freq in form.funding_freq">{{ freq }}</option>
				</select>
			</div>
			<button v-on:click.prevent="submit">Submit</button>
			<span v-if="form.server_resp.length > 0">{{ form.server_resp }}</span>
		</form>
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
				server_resp: ''
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
				execs: {
					core: [
					{
						position: 'President',
						first_name: '',
						last_name: ''
					},
					{
						position: 'Secretary',
						first_name: '',
						last_name: ''
					},
					{
						position: 'Treasurer',
						first_name: '',
						last_name: ''
					},
					{
						position: 'Vice President',
						first_name: '',
						last_name: ''
					}],
					misc: [{}]
				},
				funding: [{}],
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
		remove_advisor(index) {
			var arr = this.org.advisors;
			if(arr.length <= 1) {
				arr[index] = {};
			}
			else {
				this.org.advisors.splice(index, 1);
			}
		},
		submit() {
			CommunityService.submitCommunity(this.validate_form(this.org))
			.then((data) => {
				this.form.server_resp = data['data'];
			});
		},
		validate_form(form) {
			return form;
		}
	}
}
</script>
<style scoped>

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

.mar-left {
	margin-left: 10px;
}

label {
	font-size: 13px;
	font-weight: 600;
}

input {
	margin-right: 10px;
	border: none;
}

.name div {
	display: flex;
}
</style>