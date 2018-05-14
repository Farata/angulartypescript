import * as express from 'express';
import { createServer } from 'http';
import { createBidServer } from './ws-auction';
import { router } from './rest-auction';

const app = express();
app.use('/api', router);
app.use('/data', express.static('data'));

const server = createServer(app);
createBidServer(server);

server.listen(9090, "localhost", () => {
  const {address, port} = server.address();
  console.log('Listening on %s %s', address, port);
});
