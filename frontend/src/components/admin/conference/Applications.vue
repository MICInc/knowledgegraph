<template>
	<div id="container">
		<table>
			<th v-for="(key, i) in Object.keys(applications[0])">{{ key }}</th>
			<tr v-for="(row, i) in applications">
				<td v-for="key in Object.keys(row)">{{ row[key] }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import Socket from '@/instances/Socket';

export default {
	name: 'Applications',
	beforeDestroy() {
		Socket.$off('message', this.receive);
	},
	created() {
		Socket.$on('message', this.receive);
	},
	data() {
		return {

		}
	},
	methods: {
		receive(data) {
			console.log(data);
		}
	},
	props: ['applications']
}
</script>

<style>
#container {
	width: 100%;
	overflow-x: auto;
	float: right;
}

table {
	border-collapse: collapse;
	width: 100%;
	overflow: scroll;
	overflow: auto;
	table-layout: fixed;
}

table, th, td {
	border: 1px solid #F7F7F7;
}
</style>