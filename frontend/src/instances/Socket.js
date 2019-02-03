/*
	Resources:
	https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
	https://stackoverflow.com/questions/46677360/vue-emitting-global-events-from-websocket-listener
*/
import Vue from 'vue';

const websocket = new WebSocket('ws://localhost:7000');

websocket.addEventListener('open', () => {
	console.log('client connected');
});

websocket.addEventListener('message', e => {
	console.log('reply:');
	console.log(e.data);
});

export default websocket;