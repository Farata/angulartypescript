import { Component } from '@angular/core';
import {IPriceQuote} from "./iprice.quote";

@Component({
  selector: 'app-root',
  template: `
    AppComponent received: {{priceQuote?.stockSymbol}} 
                           {{priceQuote?.lastPrice | currency:'USD':true}} 
   <price-quoter (lastPrice)="priceQuoteHandler($event)"></price-quoter>
    `
})
export class AppComponent {
  priceQuote : IPriceQuote;

  priceQuoteHandler(event:IPriceQuote) {
    this.priceQuote = event;
  }
}
