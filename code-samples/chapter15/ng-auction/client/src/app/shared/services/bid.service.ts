import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { WS_URL } from '../../app.tokens';

export interface BidMessage {
  productId: number;
  price: number;
}

@Injectable()
export class BidService {
  private _subject: WebSocketSubject<any>;
  private get subject(): WebSocketSubject<any> {
    const open = this._subject && !this._subject.closed;
    return open ? this._subject : this._subject = WebSocketSubject.create(this.wsUrl);
  }

  get priceUpdates(): Observable<BidMessage> {
    return this.subject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {}

  placeBid(productId: number, price: number): void {
    this.subject.next(JSON.stringify({ productId, price }));
  }
}
