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
import Vue from 'vue';

const websocket = new WebSocket('ws://localhost:7000');

websocket.addEventListener('open', () => {
	console.log('connected');
});

websocket.addEventListener('message', e => {
	console.log('reply:');
	console.log(e.data);
});

websocket.onmessage = function(message) {
	emitter.$emit('message', message.data);
}

websocket.onerror = function(error) {
	emitter.$emit('error', error);
}

const socket = new Vue({
	methods: {
		send(data) {
			if(websocket.readyState == WebSocket.OPEN) {
				console.log('sending message');
				websocket.send(data);
			}
			else {
				throw 'Not connected';
			}
		}
	}
});

export default socket;
