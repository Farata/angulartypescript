import * as http from 'http';
import * as ws from 'ws';
import { updateProductBidAmount} from './db-auction';

interface BidMessage {
  productId: number;
  price: number;
}

export function createBidServer(httpServer: http.Server): BidServer {
  return new BidServer(httpServer);
}

export class BidServer {
  private readonly wsServer: ws.Server;

  constructor(server: http.Server) {
    this.wsServer = new ws.Server({ server });
    this.wsServer.on('connection', (userSocket: ws) => this.onConnection(userSocket));
  }

  private onConnection(ws: ws): void {
    // Subscribe to WebSocket events.
    ws.on('message', (message: string) => this.onMessage(message));
    ws.on('error', (error: Error) => this.onError(error));
    ws.on('close', () => this.onClose());

    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onMessage(message: string): void {
    const bid: BidMessage = JSON.parse(message);
    updateProductBidAmount(bid.productId, bid.price);

    // Broadcast the new bid amount
    this.wsServer.clients.forEach(ws => ws.send(JSON.stringify(bid)));
    console.log(`Bid ${bid.price} is placed on product ${bid.productId}`);
  }

  private onClose(): void {
    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onError(error: Error): void {
    console.error(`WebSocket error: "${error.message}"`);
  }
}
