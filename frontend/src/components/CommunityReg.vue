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
			<select v-model.trim="org.school">
				<option v-for="school in form.schools">{{ school }}</option>
			</select><br>
			<label>Does your community already exist?</label><input type="checkbox" value="yes" v-model="form.exists"><br>
			<div v-if="form.exists">
				<label>What's the name of your organizaion?</label><br>
				<input type="text" v-model.trim="org.name"><br>
				<label>Who will be {{ org.school }} MIC's executives?</label><br>
			</div>
			<div v-else>
				<label>Who will be {{ org.name }}'s executives upon joining MIC?</label><br>
			</div>
			<div v-for="(value, index) in org.execs.core">
				<label>{{ value.position }}</label><br>
				<input :ref="'exec_first_name'+index" type="text" placeholder="First name" v-model.trim="org.execs.core[index].first_name">
				<input :ref="'exec_last_name'+index" type="text" placeholder="Last name" v-model.trim="org.execs.core[index].last_name">
			</div>
			<label>Additional executives</label><br>
			<div v-for="(value, index) in org.execs.misc">
				<input :ref="'exec'+index" type="text" placeholder="First name" v-model.trim="org.execs.misc[index].first_name">
				<input :ref="'exec'+index" type="text" placeholder="Last name" v-model.trim="org.execs.misc[index].last_name" v-on:keyup.enter="add_exec(index)">
			</div>
			<label v-if="form.exists">Does {{ org.name }} have advisors?</label>
			<label v-else>Does {{ org.school }} MIC have advisors?</label>
			<div v-for="(value, index) in org.advisors">
				<input :ref="'advisor_first'+index" type="text" placeholder="First name" v-model.trim="org.advisors[index].first_name">
				<input :ref="'advisor_last'+index" type="text" placeholder="Last name" v-model.trim="org.advisors[index].last_name" v-on:keyup.enter="add_advisor(index)">
				<!-- <button v-on:click.prevent="remove_advisor(index)">remove</button> -->
			</div>
			<label>What are your current sources of funding?</label><br>
			<div v-for="(value, index) in org.funding">
				<input type="text" placeholder="Source" v-model.trim="org.funding[index].src">
				<input type="text" placeholder="$ (USD)" v-model.number="org.funding[index].amount" v-on:keyup.enter="add_funding(index)">
			</div>
			<button v-on:click.prevent="submit">Submit</button>
		</form>
		<button v-on:click.prevent="reveal_form"><span v-if="form.reveal">Close form</span><span v-else>Start a Community</span></button>
	</div>
</template>

<script>
import CommunityService from '@/services/CommunityService';

export default {
	name: 'community-reg',
	data() {
		return {
			form: {
				exists: false,
				reveal: false,
				schools: ['MIT', 'Boston University', 'Harvard']
			},
			org: {
				advisors: [{}],
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
		reveal_form() {
			this.form.reveal = !this.form.reveal;
		},
		submit() {
			CommunityService.submitCommunity(this.org)
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