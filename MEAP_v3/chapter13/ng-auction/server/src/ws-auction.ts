import * as http from 'http';
import * as ws from 'ws';
import { parse as parseUrl } from 'url';
import { parse as parseQueryString } from 'querystring';
import { updateProductBidAmount} from './db-auction';

type UserId = string;

interface BidMessage {
  productId: number;
  amount: number;
}

export function createBidServer(httpServer: http.Server): BidServer {
  return new BidServer(httpServer);
}

export class BidServer {
  private readonly wsServer: ws.Server;
  private readonly productsToUsers = new Map<number, Set<UserId>>();
  private readonly usersToConnections = new Map<UserId, Set<ws>>();

  constructor(server: http.Server) {
    this.wsServer = new ws.Server({ server });
    this.wsServer.on('connection',
       (userSocket: ws, httpRequest: http.IncomingMessage) => this.onConnection(userSocket, httpRequest));
  }

  private onConnection(ws: ws, req: http.IncomingMessage): void {
    // Remember who is associated with current WS connection,
    // so we can send bid updates to specific users.
    const userId = BidServer.parseUserId(req);
    const connections = this.usersToConnections.get(userId) || new Set<ws>();
    this.usersToConnections.set(userId, connections.add(ws));

    // Subscribe to WebSocket events.

    ws.on('message', (message: string) => this.onMessage(userId, message));
    ws.on('close', (userSocket: ws) => this.onClose(userId, userSocket));
    ws.on('error',
     (userSocket: ws) => this.onError(userId, userSocket));

    console.log(`
      Connection opened.
      Open connections count: ${this.wsServer.clients.size} - ${connections.size}
    `);
  }

  private onMessage(userId: UserId, message: string): void {
    const bid: BidMessage = JSON.parse(message);
    const subscribedUsers = this.productsToUsers.get(bid.productId);
    this.productsToUsers.set(bid.productId, subscribedUsers.add(userId));
    updateProductBidAmount(bid.productId, bid.amount);

    // Broadcast the new bid amount
    Array.from(subscribedUsers)
      .map(userId => this.usersToConnections.get(userId))
      .reduce((allConnections: ws[], userConnections: Set<ws>) => {
        return allConnections.concat(Array.from(userConnections));
      }, [])
      .forEach(ws => ws.send(JSON.stringify(bid)));

    console.log(this.productsToUsers);
  }

  private onClose(userId: UserId, ws: ws): void {
    const connections = this.usersToConnections.get(userId);
    connections.delete(ws);

    console.log(`Connection closed. Open connections count: ${this.wsServer.clients.size} - ${connections.size}`);
  }

  private onError(userId: UserId, ws: ws): void {
    //console.error(`WebSocket error. User ID: ${userId}. Error message: "${error.message}"`);
    console.error(`WebSocket error. User ID: ${userId}. Error message: "${ws['message']}"`);
    const connections = this.usersToConnections.get(userId);
    connections.delete(ws);
  }

  private static parseUserId(req: http.IncomingMessage): UserId {
    const url = parseUrl(req.url || '');
    const params = parseQueryString(url.query || '');
    return params.userId as string;
  }
}
