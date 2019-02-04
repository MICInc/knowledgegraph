import Socket from '@/lib/Socket'

Socket.addEventListener('open', () => {
	console.log('editor connected');
});

Socket.addEventListener('message', e => {
	var data = typeof e.data == 'object' && e.data != null ? JSON.parse(e.data) : e.data;
	console.log('server: '+e.data);
});

export default {
	send(data) {
		Socket.send(JSON.stringify({route: 'editor', data: data}));
	}
}