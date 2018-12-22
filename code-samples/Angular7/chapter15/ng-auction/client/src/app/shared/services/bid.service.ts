import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/websocket';
import { WS_URL } from '../../app.tokens';

export interface BidMessage {
  productId: number;
  amount: number;
}

@Injectable()
export class BidService {
  private _subject: WebSocketSubject<any>;
  private get subject(): WebSocketSubject<any> {
    const open = this._subject && !this._subject.closed;
    return open ? this._subject
                : this._subject = new WebSocketSubject(this.wsUrl);
  }

  get priceUpdates(): Observable<BidMessage> {
    return this.subject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {}

  placeBid(productId: number, amount: number): void {
    this.subject.next({ productId, amount });
  }
}
