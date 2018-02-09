"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.post("/api/product", (req, res) => {
    console.log(`Received new product ${req.body.title} ${req.body.price}`);
    if (Math.random() < 0.5) {
        res.status(500);
        res.send({ 'message': 'Server responded: error adding product '
                + req.body.title });
    }
    else {
        res.send({ 'message': 'Server responded: added ' + req.body.title });
    }
});
const server = app.listen(8000, "localhost", () => {
    const { address, port } = server.address();
    console.log('Listening on %s %s', address, port);
});
