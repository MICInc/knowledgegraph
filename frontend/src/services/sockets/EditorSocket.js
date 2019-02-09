import Socket from '@/lib/Socket'

export default {
	async open(callback) {
		Socket.addEventListener('open', callback);
	},
	async receive(callback) {
		Socket.addEventListener('message', callback);
	},
	send(data) {
		if(Socket.readyState == 1) Socket.send(JSON.stringify({route: 'editor', data: data}));
	}
}