<template>
	<div class="container">
		<PageNav></PageNav>
		<div class="community-reg" v-if="!form.complete">
			<ReadMe></ReadMe>
			<form id="community-reg-form">
				<School :error="form.error.school"></School>
				<Institution 
					:err_name="form.error.name"
					:eff_aff="form.error.affiliation"
					:err_est="form.error.established">
				</Institution>
				<Executives :error="form.error.execs"></Executives>
				<Advisors></Advisors>
				<button v-on:click.prevent="submit">Submit</button>
			</form>
		</div>
		<div class="community-reg" v-if="form.complete">
			Thank you for completing this form.
		</div>
	</div>
</template>

<script>
import CommunityService from '@/services/CommunityService';
import PageNav from '@/components/PageNav'
import ReadMe from '@/components/community/registration/ReadMe'
import School from '@/components/community/registration/School'
import Institution from '@/components/community/registration/Institution'
import Executives from '@/components/community/registration/Executives'
import Advisors from '@/components/community/registration/Advisors'

export default {
	name: 'community-reg',
	components: {
		PageNav,
		ReadMe,
		School,
		Institution,
		Executives,
		Advisors
	},
	data() {
		return {
			form: {
				error: {
					advisors: false,
					affiliation: false,
					established: false,
					execs: false,
					name: false,
					school: false
				},
				complete: false
			},
			org: {
				advisors: [],
				affiliation: {},
				established: '',
				execs: [],
				name: '',
				school: ''
			}
		}
	},
	methods: {
		submit() {
			this.a_submit().then((resp) => {
				var err = resp.data.error;
				console.log(resp.data);

				if(err != undefined && resp.status == 200) {
					this.form.error = err;
				} else if (resp.status == 200) {
					this.form.complete = true;
				}
			});
		},
		async a_submit() {
			return await CommunityService.submitCommunity(this.org);
		}
	}
}
</script>
<style scoped>

#body {
	margin: 0px 30%; 
}

h2 {
	color: #593c75;
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

.community-reg {
	margin-top: 10px;
}

.form-button {
	margin-bottom: 15px;
}

form {
	display: flex;
	flex-direction: column;
	align-items: baseline;
}

.form-sect {
	margin-bottom: 1em;
}

.name {
	display: flex;
	flex-direction: column;
}

.full-width {
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
	color: #593c75;
	font-size: 1.5em;
	cursor: pointer;
}

.field-header {
	font-size: 1em;
}

#schools {
	font-size: 1em;
}

.error {
	border: solid;
	border-width: 0.5px;
	border-color: red;
}

</style>