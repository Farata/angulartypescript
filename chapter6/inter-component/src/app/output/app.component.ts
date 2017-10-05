import { Component } from '@angular/core';
import {IPriceQuote} from "./iprice.quote";

@Component({
  selector: 'app-root',
  template: `
    AppComponent received: {{stockSymbol}} {{price | currency:'USD':true}} 
   <price-quoter (lastPrice)="priceQuoteHandler($event)"></price-quoter>
    `
})
export class AppComponent {

  stockSymbol;
  price;

  priceQuoteHandler(event:IPriceQuote) {
    this.stockSymbol = event.stockSymbol;
    this.price = event.lastPrice;
  }
}
