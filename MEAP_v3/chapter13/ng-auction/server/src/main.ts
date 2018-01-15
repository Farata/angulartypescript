import * as express from 'express';
import { createServer } from 'http';
import { createBidServer } from './ws-auction';
import { api } from './rest-auction';

const app = express();
app.use('/api', api);

const server = createServer(app);
createBidServer(server);

server.listen(9090, "localhost", () => {
  const {address, port} = server.address();
  console.log('Listening on %s %s', address, port);
});
