import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import {WebSocketSubject} from 'rxjs/websocket';
import { WS_URL } from '../../app.tokens';

export interface BidMessage {
  productId: number;
  price: number;
}

@Injectable()
export class BidService {
  private _wsSubject: WebSocketSubject<any>;
  private get wsSubject(): WebSocketSubject<any> {
    const closed = !this._wsSubject || this._wsSubject.closed;
    if (closed) {
      this._wsSubject = new WebSocketSubject(this.wsUrl);
      // this._wsSubject = WebSocketSubject.create(this.wsUrl); // RxJS 5
    }
    return this._wsSubject;
  }

  get priceUpdates$(): Observable<BidMessage> {
    return this.wsSubject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {}

  placeBid(productId: number, price: number): void {
    // this.wsSubject.next(JSON.stringify({ productId, price }));  // RxJS 5
    this.wsSubject.next({ productId, price });
  }
}
