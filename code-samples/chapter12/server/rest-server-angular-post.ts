import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post("/api/product", (req, res) => {

    console.log(`Received new product ${req.body.title} ${req.body.price}`);

    res.json({'message':`Server responded: added ${req.body.title}`});
});

const server = app.listen(8000, "localhost", () => {
    const {address, port} = server.address();
    console.log(`Listening on ${address}: ${port}`);
});
