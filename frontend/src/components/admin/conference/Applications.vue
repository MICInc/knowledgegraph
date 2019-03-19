<template>
	<div class="container">
		<table>
			<button v-on:click="checkin()">CHECK-IN</button>
			<th class="headers" v-for="(key, i) in Object.keys(applications[0])">{{ key }}</th>
			<tr class="values" v-for="(row, i) in applications">
				<td v-for="key in Object.keys(row)">{{ row[key] }}</td>
			</tr>
		</table>
	</div>
</template>

<script>

export default {
	name: 'Applications',
	data() {
		return {
		}
	},
	methods: {
		checkin() {
			console.log('checked in');
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