import {Component, Output, EventEmitter}  from '@angular/core';
import {IPriceQuote} from "./iprice.quote";


@Component({
  selector: 'price-quoter',
  template: `<strong>Inside PriceQuoterComponent:
               {{priceQuote.stockSymbol}} 
               {{priceQuote.lastPrice | currency:'USD':true}}</strong>`,
  styles:[`:host {background: pink;}`]
})
export class PriceQuoterComponent {
  @Output() lastPrice = new EventEmitter<IPriceQuote>();

  priceQuote : IPriceQuote;

  constructor() {
    setInterval(() => {
      this.priceQuote = {
        stockSymbol: "IBM",
        lastPrice: 100*Math.random()
      };

      this.lastPrice.emit(this.priceQuote);
    }, 2000);
  }
}
