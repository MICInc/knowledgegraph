<template>
	<div>
		<label :class="{ error_font: error }">Affiliation</label><br>
		<ul>
			<li v-for="aff in affiliations">
				<input type="radio" v-bind:value="aff" v-model="selected" @change="set_aff($event)">{{ aff }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Affiliation',
	data () {
		return {
			selected: '',
			affiliations: ['MIC Alum', 'MIC Student', 'Non-MIC Student', 'Non-student', 'Sponsor']
		}
	},
	methods: {
		set_aff(aff) {
			this.$emit('aff', this.selected);
		}
	},
	props: ['error']
}
</script>

<style scoped>
ul {
	margin-bottom: 10px;
}

ul li {
	display: row;
}

ul li input {
	margin: 5px 10px 0 0;
	width: 10px;
}
</style>