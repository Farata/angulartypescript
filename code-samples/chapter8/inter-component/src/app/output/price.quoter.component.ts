import {Component, Output, EventEmitter}  from '@angular/core';
import {IPriceQuote} from "./iprice.quote";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'price-quoter',
  template: `<strong>Inside PriceQuoterComponent:
               {{priceQuote?.stockSymbol}}
               {{priceQuote?.lastPrice | currency:'USD':'symbol'}}</strong>`,
  styles:[`:host {background: pink;}`]
})
export class PriceQuoterComponent {
  @Output() lastPrice = new EventEmitter<IPriceQuote>();

  priceQuote : IPriceQuote;

  constructor() {
    Observable.interval(2000)
      .subscribe(data =>{
        this.priceQuote = {
          stockSymbol: "IBM",
          lastPrice: 100 * Math.random()
        };

        this.lastPrice.emit(this.priceQuote);})

/* setInterval() is browser-only API so we used Observable.interval()
  setInterval(() => {
      this.priceQuote = {
        stockSymbol: "IBM",
        lastPrice: 100 * Math.random()
      };

      this.lastPrice.emit(this.priceQuote);
    }, 2000);*/
  }
}
