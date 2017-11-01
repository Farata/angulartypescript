import {Component, Output, EventEmitter} from '@angular/core';
import {IStock} from './istock';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'price-quoter',
  template: `<strong><input type="button" value="Buy" (click)="buyStocks()">
               {{stockSymbol}} {{lastPrice | currency:'USD':true:'1.2-2'}}</strong>
              `,
  styles:[`:host {background: pink; padding: 5px 15px 15px 15px;}`]
})
export class PriceQuoterComponent {
  @Output() buy: EventEmitter <IStock> = new EventEmitter();

  stockSymbol = "IBM";
  lastPrice: number;

  constructor() {
    Observable.interval(2000)
      .subscribe(data =>
      this.lastPrice = 100 * Math.random());

    /* setInterval() is browser-only API so we used Observable.interval()
    setInterval(() => {
      this.lastPrice = (100*Math.random());
    }, 2000);*/
  }

  buyStocks(): void{

    let stockToBuy: IStock = {
      stockSymbol: this.stockSymbol,
      bidPrice: this.lastPrice
    };

    this.buy.emit(stockToBuy);
  }
}
