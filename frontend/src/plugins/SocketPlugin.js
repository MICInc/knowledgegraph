export default function webSocketPlugin(socket) {
	return store => {
		socket.on('data', data => {
			store.commit('receiveData', data);
		});

		socket.subscribe(mutation => {
			if(mutation.type == 'UPDATE_DATA') {
				socket.emit('update', mutation.payload);
			}
		});
	}
}