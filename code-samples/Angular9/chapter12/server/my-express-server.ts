import * as express from "express";
import { AddressInfo } from "net";
const app = express();

app.get('/', (req, res) => res.send('Hello from Express'));

app.get('/products', (req, res) => res.send('Got a request for products'));

app.get('/reviews', (req, res) => res.send('Got a request for reviews'));

const server = app.listen(8000, "localhost", () => {

    const {address, port} = server.address() as AddressInfo;
    console.log(`Listening on ${address}:${port}`);
});