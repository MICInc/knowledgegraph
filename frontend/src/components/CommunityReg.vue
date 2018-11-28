<template>
	<div id="community-reg">
		<div>
			<h2>READ.ME</h2>
			<p>
				Before you start a community checkout our Machine Intelligence Community agreement, general code of conduct, and media kit!
			</p>
		</div>
		<form id="community-reg-form" v-if="form.reveal">
 			<label>Where will MIC's next community be?</label><br>
			<select v-model="organization.school">
				<option v-for="school in form.schools">{{ school }}</option>
			</select><br>
			<label>Does your community already exist?</label><input type="checkbox" value="yes" v-model="form.exists"><br>
			<div v-if="form.exists">
				<label>What's the name of your organizaion?</label><br>
				<input type="text" v-model="organization.name"><br>
				<label>Who will be {{ organization.school }} MIC's executives?</label><br>
			</div>
			<div v-else>
				<label>Who will be {{ organization.name }}'s executives upon joining MIC?</label><br>
			</div>
			<span v-for="exec in form.execs">
				<label>{{ exec }}</label><br>
				<input type="text" v-bind:value="exec" v-on:keyup.enter="add_exec"><br>
			</span><br>
			<label>Advisors</label><br>
			<label v-if="form.exists">Does {{ organization.name}} have advisors?</label>
			<label v-else>Does {{ organization.school }} MIC have advisors?</label>
			<div v-for="(value, index) in organization.advisors">
				<input :ref="'advisor'+index" type="text" v-model="organization.advisors[index]" 
				v-on:keyup.enter="add_advisor(index)">
			</div>
			<label>What are your current sources of funding?</label><br>
			<div v-for="(value, index) in organization.funding" >
				<input type="text" v-model="organization.funding[index]" v-on:keyup.enter="add_funding(index)">
			</div>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<button v-on:click.prevent="reveal_form">Start a Community</button>
	</div>
</template>

<script>
import CommunityService from '@/services/CommunityService';

export default {
	name: 'community-reg',
	data() {
		return {
			form: {
				current: '',
				execs: ['President', 'Vice-president (co-president)', 'Treasurer', 'Secretary'],
				exists: false,
				reveal: false,
				schools: ['MIT', 'Boston University', 'Harvard']
			},
			organization: {
				advisors: [''],
				funding: [''],
				members: [],
				name: '',
				execs: {
					president: '',
					secretary: '',
					treasurer: '',
					vice_pres: '',
					other: []
				},
				school: ''
			}
		}
	},
	methods: {
		add_advisor(index) {
			var next = index + 1;
			this.organization.advisors.splice(next, 0, '');
			this.$nextTick(() => this.$refs['advisor'+index].focus());
		},
		add_exec() {

		},
		add_funding(index) {
			this.organization.funding.splice(index+1, 0, '');
		},
		reveal_form() {
			this.form.reveal = !this.form.reveal;
		},
		submit() {
			CommunityService.submitCommunity(this.organization)
			.then(function(data){
				alert(data);
			});
		}
	}
}
</script>

<style>
ul {
  list-style-type: none;
}
</style>