/*
	Resources:
	https://stackoverflow.com/questions/46677360/vue-emitting-global-events-from-websocket-listener
	https://github.com/GeekLaunch/ws-chat/blob/master/client/client.js
	https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
	https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
	https://stackoverflow.com/questions/34808925/express-and-websocket-listening-on-the-same-port
	https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
	https://www.npmjs.com/package/ws
*/

const socket = new WebSocket('ws://localhost:7000');


/*
Client needs to implement:
	socket.addEventListener('open', () => {
		console.log('connected');
	}),

	socket.addEventListener('application', e => {
		console.log(e.data);
	});
*/
export default {
	socket: socket,
	send(data) {
		console.log('socketssss');
		if(socket.readyState == WebSocket.OPEN) {
			socket.send(data);
		}
		else {
			throw 'Not connected';
		}
	}
}