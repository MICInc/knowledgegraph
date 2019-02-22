/*
	Resources:
	https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
	https://stackoverflow.com/questions/46677360/vue-emitting-global-events-from-websocket-listener
	https://stackoverflow.com/questions/11768221/firefox-websocket-security-issue
	https://stackoverflow.com/questions/44333164/vuex-websockets
	https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications#Receiving_and_interpreting_JSON_objects
*/

// change ws to wss for secure socket once the node websocket server is setup
const websocket = new WebSocket('ws://localhost:7000');

export default websocket;