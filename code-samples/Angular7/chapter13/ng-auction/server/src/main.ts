import * as path from 'path';
import * as express from 'express';
import { createServer } from 'http';
import { createBidServer } from './ws-auction';
import { router } from './rest-auction';

const app = express();
app.use('/api', router);
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

const server = createServer(app);
createBidServer(server);

server.listen(9090, "localhost", () => {
  // const {address, port} = server.address();
  // console.log('Listening on %s %s', address, port);
  console.log('Listening on localhost:9000');
});
