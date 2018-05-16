import {Component, Output, EventEmitter} from '@angular/core';
import {PriceQuote} from "./iprice.quote";
import {interval} from 'rxjs';

@Component({
  selector: 'price-quoter',
  template: `<strong>Inside PriceQuoterComponent:
               {{priceQuote?.stockSymbol}}
               {{priceQuote?.lastPrice | currency:'USD'}}</strong>`,
  styles:[`:host {background: pink;}`]
})
export class PriceQuoterComponent {
  @Output() lastPrice = new EventEmitter<PriceQuote>();

  priceQuote: PriceQuote;

  constructor() {
    interval(2000)
      .subscribe(data => {
        this.priceQuote = {
          stockSymbol: 'IBM',
          lastPrice: 100 * Math.random()
        };

        this.lastPrice.emit(this.priceQuote);})

/* setInterval() is browser-only API so we used RxJS interval() instead
  setInterval(() => {
      this.priceQuote = {
        stockSymbol: "IBM",
        lastPrice: 100 * Math.random()
      };

      this.lastPrice.emit(this.priceQuote);
    }, 2000); */
  }
}
