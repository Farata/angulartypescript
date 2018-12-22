import {Server} from "ws";

var wsServer = new Server({port:8085});

console.log('WebSocket server is listening on port 8085');

wsServer.on('connection',
    websocket => {

        websocket.send('Hello from the two-way WebSocket server');

        websocket.onmessage = (message) =>
                console.log(`The server received:  ${message['data']}`);

        websocket.onerror = (error) =>
            console.log(`The server received: ${error['code']}`);

        websocket.onclose = (why) =>
            console.log(`The server received: ${why.code} ${why.reason}`);
    }
);







// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
