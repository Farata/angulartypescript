import * as express from "express";
import * as path from "path";
import {Server} from "ws";

const app = express();

// HTTP Server
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../simple-websocket-client.html')));

const httpServer = app.listen(8000, "localhost", () => {
    const {port} = httpServer.address();
    console.log(`HTTP server is listening on ${port}`);
});

// WebSocket Server
const wsServer = new Server({port:8085});
console.log('WebSocket server is listening on port 8085');

wsServer.on('connection',
           wsClient => {
               wsClient.send('This message was pushed by the WebSocket server');

               wsClient.onerror = (error) =>
                   console.log(`The server received: ${error['code']}`);
           }
);

// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/
