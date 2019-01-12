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
import io from 'socket.io-client'

export default {
	name: 'Applications',

	data() {
		return {
			socket: new io('127.0.0.1:7000', {
				extraHeaders: {
					'Access-Control-Allow-Credentials': 'omit'
				}
			})
		}
	},
	props: ['applications'],
	created() {
		// this.socket.emit('REGISTRATIONS', {1: 'fuck this shit'});
		// this.socket.on('MESSAGE', (data) => {
		// 	// console.log(data);
		// });
	}
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