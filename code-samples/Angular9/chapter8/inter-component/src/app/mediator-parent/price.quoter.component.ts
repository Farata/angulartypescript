import {Component, Output, EventEmitter} from '@angular/core';
import {Stock} from './istock';
import {Observable, interval} from 'rxjs';

@Component({
  selector: 'price-quoter',
  template: `<strong>
               <button (click)="buyStocks()">Buy</button>
               {{stockSymbol}} {{lastPrice | currency: "USD"}}
             </strong>
            `,
  styles: [`:host {background: pink; padding: 5px 15px 15px 15px;}`]
})
export class PriceQuoterComponent {
  @Output() buy: EventEmitter <Stock> = new EventEmitter();

  stockSymbol = 'IBM';
  lastPrice: number;

  constructor() {
    interval(2000)
      .subscribe(data =>
      this.lastPrice = 100 * Math.random());
  }

  buyStocks(): void {

    const stockToBuy: Stock = {
      stockSymbol: this.stockSymbol,
      bidPrice: this.lastPrice
    };

    this.buy.emit(stockToBuy);
  }
}
