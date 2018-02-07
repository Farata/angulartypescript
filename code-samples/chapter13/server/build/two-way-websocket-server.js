"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', websocket => {
    websocket.send('Hello from the two-way WebSocket server');
    websocket.on('message', message => console.log(`Server received: ${message}`));
    websocket.onerror = (error) => console.log(`The server received: ${error['code']}`);
    websocket.onclose = (why) => console.log(`The server received: ${why.code} ${why.reason}`);
});
// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
